/*Status:
    basically j need to work on formatting -- what to select/not sleect
    issues rn -- receips need to have proper format for item/price...
    price has to have two decimals
    Need to improve way to filter out tax/total... and how to include that.
    Could have some calculation thing that matches the calculated total to the viewed total, but rn j working with calculated.
    Way to change name
    Way to manually input new item/price pair (shouldnt be too hard).
*/
const worker = Tesseract.createWorker({
  logger: (progress) => console.log(progress),
});

let workerInitialized = false; // Flag to track worker initialization
const table = document.getElementById("result"); // resultArea = table
const extrasTable = document.getElementById("extras");

function tableAdd(text) {
  // Adds error message to table
  const tr = document.createElement("tr");
  const td = document.createElement("td");
  td.textContent = text;
  tr.appendChild(td);
  table.appendChild(tr);
}

async function performOCR() {
  // basiccally just syntax to call tesseract and return result to processReceiptText(). Also checks filetype.
  const fileInput = document.getElementById("upload"); // fileINput = upload box
  const file = fileInput.files[0];
  const allowedMimeTypes = ["image/jpeg", "image/png"]; //checks filetype of imaeg,

  if (file && allowedMimeTypes.includes(file.type)) {
    if (!workerInitialized) {
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      workerInitialized = true;
    }

    const reader = new FileReader();

    reader.onload = async function (event) {
      try {
        const {
          data: { text },
        } = await worker.recognize(event.target.result);
        processReceiptText(text); // get the stuff from image
      } catch (error) {
        console.error("Error details:", error);
        tableAdd(["Error processing the file!"]);
      }
    };

    reader.readAsDataURL(file);
  } else {
    if (file) {
      console.error("Error: The file type is not allowed.");
      tableAdd(["Error: Please upload a JPEG or PNG file."]);
    } else {
      alert("Please upload a file first!");
    }
  }
}

export { performOCR };

let itemsDict = {}; // dict of item / price pairs
let extrasDict = {};

function processReceiptText(ocrResult) {
  // takes text chunk and formats it for rest of functions
  const lines = ocrResult.split("\n"); // split result into individual lines
  const pricePattern = /(.*)\s(\-?\d+\.\d{2})$/; // format indicating item/price pairing.
  // regular expression format --
  // () = captured group
  //  / = start of expression
  // .* = any number of characters in a row (name of food item)
  // \s = whitespace (space between name and price)
  // \-? = optional '-' character
  // \d+ = any number of numbers
  // \. = decimal place
  // \d{2} = two more numbers after decimal place
  // $ = end of line

  const filteredLines = lines.filter((line) => pricePattern.test(line));
  // array filteredLines holds item price pairs matching the pricePattern format.

  itemsDict = {}; // clear out dictionary if previous entries existed from last receipt.
  extrasDict = {};
  let foundTax = false;
  let foundTotal = false;

  for (const line of filteredLines) {
    const match = line.match(pricePattern);
    // match = array where match[0] = full captured string, match[1] = item name, match[2] = captured group (price). Subsequent array elements would be other captured groups if they were defined.
    if (match) {
      const price = parseFloat(match[2]); // turns price string into number
      const itemName = match[1].trim(); // saves and trims item name.

      if (
        !line.toLowerCase().includes("card") &&
        !line.toLowerCase().includes("total") &&
        !line.toLowerCase().includes("balance") &&
        !line.toLowerCase().includes("tax") &&
        !foundTax &&
        !foundTotal
      ) {
        // if line has tax or tax hasn't been found yet
        itemsDict[itemName] = price; // add to dict
      } else if (line.toLowerCase().includes("tax")) {
        foundTax = true;
        itemsDict[itemName] = price; // add to dict
      } else {
        extrasDict[itemName] = price; // add to separate dictionary.
        foundTotal = true;
      }
    }
  }
  displayResults();
}

function updatePrice(event, item) {
  // 'Enter' eventhandler, updates dictionary with new value and calls displayResults() to redraw table.
  if (event.key === "Enter") {
    const inputElement = event.target;
    const newPrice = parseFloat(inputElement.value);
    if (!isNaN(newPrice)) {
      // if there is a valid price in the box !(is Not a Number)
      itemsDict[item] = newPrice; // update dict w new value
      displayResults(); // redraw the table
    } else {
      console.error("Invalid price entered!");
    }
  }
}

function addPairs(arr) {
  // creates a new row in the table, input = array of [item,price] pairs
  arr.forEach((ele) => {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const input = document.createElement("input");
    td1.textContent = ele[0];
    td2.classList.add("price");
    td2.setAttribute("data-item", ele[0]);
    td2.textContent = ele[1].toFixed(2);
    input.setAttribute("type", "text");
    input.addEventListener("keypress", function (event) {
      updatePrice(event, ele[0]);
    });
    td3.appendChild(input);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    table.appendChild(tr);
  });
}

function displayResults() {
  // used to clear and print the entire table based on dict elements
  table.innerHTML = "";
  const itemArr = [];
  for (const [item, price] of Object.entries(itemsDict)) {
    // for each pair in dict..
    itemArr.push([item, price]);
  }
  addPairs(itemArr);
  // templates https://codesandbox.io/s/happy-jackson-sj700?file=/index.html
  // /src/index.js

  const calculatedTotal = Object.values(itemsDict).reduce(
    (acc, cur) => acc + cur,
    0
  );
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  td1.innerText = "Calculated Total:";
  td2.innerText = calculatedTotal.toFixed(2);
  td2.setAttribute("colspan", "2");
  tr.appendChild(td1);
  tr.appendChild(td2);
  table.appendChild(tr);

  extrasTable.innerHTML = "";
  console.log(extrasDict);
  for (const [item, price] of Object.entries(extrasDict)) {
    // for each pair in dict..
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    td1.innerText = item;
    td2.innerText = parseFloat(price);
    tr.appendChild(td1);
    tr.appendChild(td2);
    extrasTable.appendChild(tr);
  }
}
