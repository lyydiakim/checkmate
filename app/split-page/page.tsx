// havent changed the tesseract stuff ~ just displaying the parsed text atm
// add functionality to change the tesseract text
// uploaded image is saved in session storage under fileURL and tesseract stuff saved under ocrResult
"use client";
import Tesseract from "tesseract.js";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRightCircle } from "lucide-react";

interface Item {
  price: string;
  splitBetween: number;
}

const distinctColors = [
  // these colors are used to distinguish between users
  "#FF5733",
  "#33FF57",
  "#5733FF",
  "#FFFF33",
  "#33FFFF",
  "#FF33FF",
  "#FF6633",
  "#33FFCC",
  "#9966FF",
  "#FFCC33",
  "#33FF99",
  "#FF3366",
  "#3399FF",
  "#FF9933",
  "#33FF66",
  "#6633FF",
  "#FFCC66",
  "#66FF33",
  "#CC33FF",
  "#FF6666",
];

const SplitPage: React.FC = () => {
  //  const router = useRouter();
  const [numPeople, setNumPeople] = useState<number>(2); //set default number of people splitting to 2
  const [names, setNames] = useState<string[]>([]);
  const [randomColors, setRandomColors] = useState<string[]>([]);
  const [imageURL, setImageURL] = useState<string | null>(null); // storing the image URL
  const [ocrResult, setOcrResult] = useState<string | null>(null); // storing OCR result
  const [itemPrice, setItemPrice] = useState<Record<string, Item>>({}); // storing the items from the receipt

  // event handler for radio button (split evenly / unevenly)
  const [selectedOption, setSelectedOption] = useState("");

  // State to track whether evenly / unevenly has been clicked
  const [optionClicked, setOptionClicked] = useState(false);

  // event handler for radio button change
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    setOptionClicked(true);
  };

  useEffect(() => {
    // retrieve the image URL from session storage
    const storedImageURL = sessionStorage.getItem("fileUrl");
    setImageURL(storedImageURL);

    // perform OCR on the image
    if (storedImageURL) {
      Tesseract.recognize(
        storedImageURL,
        "eng",
        { logger: (info) => console.log(info) } // can see the progress in the console
      ).then(({ data }) => {
        setOcrResult(data.text); //setting ocrResult here!!
      });
    }
  }, []);

  useEffect(() => {
    if (ocrResult) {
      const lines = ocrResult.split("\n");
      const pricePattern = /(.*)\s(\-?\d+\.\d{2}).*$/;
      const filteredLines = lines.filter((line: any) => pricePattern.test(line));
      const itemsDict: Record<string, Item> = {}
      filteredLines.forEach((line:any) => {
        const match = line.match(pricePattern);
        if (match) {
          const itemName = match[1];
          const itemPrice = match[2];
          itemsDict[itemName] = {price:itemPrice, splitBetween: 0};
        }
      });
      setItemPrice(itemsDict);
    }
  }, [ocrResult]);

  useEffect(() => {
    // make sure numPeople is non-negative
    const validNumPeople = Math.max(0, numPeople);

    // generate distinct colors for each user added
    const colors = Array(validNumPeople)
      .fill("")
      .map((_, index) => distinctColors[index % distinctColors.length]);
    setRandomColors(colors);
  }, [numPeople]);

  // event handler to update the user's inputted names
  const handleNameChange = (index: number, newName: string) => {
    const updatedNames = [...names];
    updatedNames[index] = newName;
    setNames(updatedNames);
  };

  useEffect(() => {
    // update names array when numPeople changes
    setNames((prevNames) => prevNames.slice(0, numPeople));
  }, [numPeople]);

  React.useEffect(() => {
    sessionStorage.setItem("ocrResult", JSON.stringify(itemPrice));
    sessionStorage.setItem("names", JSON.stringify(names));
  },[itemPrice,names]);

  const removeFromDict = (itemName: string) => {
    setItemPrice(prev => {
      const updatedList = { ...prev };
      if (updatedList[itemName]) {
        delete updatedList[itemName];
      }
      return updatedList;
    });
  };

  const handleNewEntry = (e : React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter'){
        const target = e.target as HTMLInputElement;
        const inputParts = target.value.split(':').map(part => part.trim());
        if (inputParts.length != 2) {
          alert('Invalid input. Please enter in the format: Item Name : Price');
          return;
        }
        const name = inputParts[0];
        if (name in itemPrice) {
          alert('Item already exists in the list. Please give a unique name or remove the item first.');
          return;
        }
        const price = inputParts[1];
        setItemPrice({ 
            ...itemPrice, 
            [name]: {
                price: price,
                splitBetween: 0
            },
        });
        target.value = '';
    }
}

  return (
    <div className="text-white pt-[6rem] m-10 flex flex-row">
      <div className="mx-4">
        <p className="text-[2rem] mb-[1.5rem] font-bold">Uploaded Image:</p>

        {imageURL && (
          <img
            src={imageURL}
            alt="Uploaded File From User"
            style={{
              width: "300px",
              height: "auto",
              border: "2px solid #333",
              display: "flex",
            }}
          />
        )}
      </div>

      {/* display OCR result */}
      {ocrResult && (
        <div className="w-[25%] mx-4">
          <p className="text-[2rem] mb-[0.5rem] font-bold">OCR Result:</p>
          <p className="text-[1rem] mb-[0.5rem] text-gray-400">Remove items by pressing "X" to the left of them.</p>
          {
            Object.entries(itemPrice).map(([item,details], index) => (
              <p key={index} className="text-[1rem]">
                <button
                  className="mr-2 text-red-500"
                  onClick={() => removeFromDict(item)}
                >
                  x
                </button>
                {item} : ${details.price}
              </p>
            ))
          }
          <p className="text-[1rem] mt-[1rem] font-bold">Enter new items here:</p>
          <p className="text-[1rem] text-gray-400">Use format: 'Item Name' : 'Price'</p>
          <input 
            onKeyDown={(e) => handleNewEntry(e)} 
            placeholder="Item Name : Price"
            style={{ color: 'black', padding:'0.2rem' }}  // Inline CSS for text color
          ></input>
        </div>
      )}

      <div className="">
        <p className="inline-flex  text-[2rem] font-bold ">
          How many people are splitting this receipt?{" "}
        </p>
        <input
          className=" ml-[2rem] inline-flex text-black w-[10%] border-blue-500 border-2 text-[1.5rem] rounded-xl font-bold p-2"
          type="number"
          placeholder="Default is 2"
          value={numPeople}
          onChange={(e) => {
            const inputValue = e.target.value;
            const parsedValue = parseInt(inputValue, 10);

            // check if the parsed value is valid number
            if (!isNaN(parsedValue)) {
              setNumPeople(Math.max(0, parsedValue));
            } else {
              //  default value of 2
              setNumPeople(2);
            }
          }}
        />
        <p className="text-[1rem] text-gray-400">
          Use the arrows to adjust the number of people.
        </p>
        <div className="pt-[3rem]">
          <p className=" text-[1.3rem]">
            Are you splitting the receipt evenly or unevenly?
          </p>
          <label className="mr-4">
            <input
              className="mr-2"
              type="radio"
              value="evenly"
              name="options"
              checked={selectedOption === "option1"}
              onChange={handleRadioChange}
            />
            Evenly
          </label>

          <label>
            <input
              className="bg-black mr-2"
              type="radio"
              value="unevenly"
              name="options"
              checked={selectedOption === "option2"}
              onChange={handleRadioChange}
            />
            Unevenly
          </label>
        </div>

        {optionClicked && (
          <div className="mt-[3rem]">
            <p className="text-[1.3rem] mb-[3rem]">
              Let's split this receipt {selectedOption}!
              <br />
              Type in the names/initials of the people you are splitting this
              reciept with.
            </p>
            {/* Display input fields for each person */}
            {Array.from({ length: numPeople }).map((_, index) => (
              <div key={index} className="ml-[3rem] mb-[3rem]">
                <div
                  className="inline-block mr-[1.5rem] w-6 h-6 rounded-full ml-2"
                  style={{ backgroundColor: randomColors[index] }}
                />
                <input
                  className="text-black p-2 rounded-xl h-[2.5rem]"
                  type="text"
                  placeholder={`Person ${index + 1}'s name`}
                  value={names[index] || ""}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                />
              </div>
            ))}
            <div className="ml-[3.5rem] mt-4">
              <Link
                className="bg-[#289ba114] border-2 border-[#9acbce8b] border-solid hover:bg-[#289ba11e] hover:animate-pulse text-2xl p-2 rounded-md"
                href="../selecting-page"
              >
                Next
                <ChevronRightCircle size={20} className="inline mb-1 ml-2" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SplitPage;
