const worker = Tesseract.createWorker({
    logger: progress => console.log(progress)
});

let workerInitialized = false;  // Flag to track worker initialization

async function performOCR() { // basiccally just tesseract syntax to call.
    const fileInput = document.getElementById('upload');
    const file = fileInput.files[0];
    const resultArea = document.getElementById('result');

    const allowedMimeTypes = ["image/jpeg", "image/png"]; //checks filetype of imaeg,

    if (file && allowedMimeTypes.includes(file.type)) {
        if (!workerInitialized) {
            await worker.load();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            workerInitialized = true;
        }

        const reader = new FileReader();

        reader.onload = async function (event) {
            try {
                const { data: { text } } = await worker.recognize(event.target.result);
                processReceiptText(text); // get the stuff from image
            } catch (error) {
                console.error("Error details:", error);
                resultArea.innerHTML = "<tr><td>Error processing the file!</td></tr>";
            }
        };

        reader.readAsDataURL(file);
    } else {
        if (file) {
            console.error("Error: The file type is not allowed.");
            resultArea.innerHTML = "<tr><td>Error: Please upload a JPEG or PNG file.</td></tr>";
        } else {
            alert("Please upload a file first!");
        }
    }
}

let itemsDict = {}; // dict of item / price pairs

function processReceiptText(ocrResult) {  // ocrResult = huge chunk of text
    const lines = ocrResult.split('\n');  // split result into individual lines
    const pricePattern = /.*\s(\-?\d+\.\d{2})$/;  // format indicating item/price pairing.
    const filteredLines = lines.filter(line => pricePattern.test(line));
    // array filteredLines holds item price pairs matching the format.

    itemsDict = {}; // clear out dict
    
    let foundTax = false; // formatting separates items from total w tax flag

    for (const line of filteredLines) {
        const match = line.match(pricePattern);
        if (match) {
            const price = parseFloat(match[1]);
            const itemName = line.replace(match[1], '').trim();

            if (line.toLowerCase().includes('tax') || !foundTax) { // if line has tax or tax hasn't been found yet
                itemsDict[itemName] = price; // add to dict
                if (line.toLowerCase().includes('tax')) foundTax = true; // stop adding to dict
            }
        }
    }
    displayResults();
}

function displayResults() {
    const resultArea = document.getElementById('result');
    let resultHTML = "";

    for (const [item, price] of Object.entries(itemsDict)) { // for each pair in dict..
        resultHTML += `
            <tr>
                <td>${item}</td>
                <td class="price" data-item="${item}">${price.toFixed(2)}</td>
                <td><input type="text" onkeypress="updatePrice(event, '${item}')"></td>
            </tr>`; // add a row to table w key, value, input box. add eventhandler for 'enter' in input boxes.
    }

    const calculatedTotal = Object.values(itemsDict).reduce((acc, cur) => acc + cur, 0);
    resultHTML += `<tr><td>Calculated Total:</td><td colspan="2">${calculatedTotal.toFixed(2)}</td></tr>`;
    resultArea.innerHTML = resultHTML; // sum and print calculated total.
}

function updatePrice(event, item) { // 'Enter' eventhandler
    if (event.key === 'Enter') {
        const inputElement = event.target;
        const newPrice = parseFloat(inputElement.value);
        if (!isNaN(newPrice)) {  // if there is stuff in input box
            itemsDict[item] = newPrice; // update dict w new value
            displayResults(); // redraw the table
        } else {
            console.error("Invalid price entered!");
        }
    }
}