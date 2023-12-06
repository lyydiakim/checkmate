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

export default function OcrPage() {
  const [imageURL, setImageURL] = useState<string | null>(null); // storing the image URL
  const [ocrResult, setOcrResult] = useState<string | null>(null); // storing OCR result
  const [itemPrice, setItemPrice] = useState<Record<string, Item>>({}); // storing the items from the receipt

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
      const filteredLines = lines.filter((line: any) =>
        pricePattern.test(line)
      );
      const itemsDict: Record<string, Item> = {};
      filteredLines.forEach((line: any) => {
        const match = line.match(pricePattern);
        if (match) {
          const itemName = match[1];
          const itemPrice = match[2];
          itemsDict[itemName] = { price: itemPrice, splitBetween: 0 };
        }
      });
      setItemPrice(itemsDict);
    }
  }, [ocrResult]);

  React.useEffect(() => {
    sessionStorage.setItem("ocrResult", JSON.stringify(itemPrice));
  }, [itemPrice]);

  const removeFromDict = (itemName: string) => {
    setItemPrice((prev) => {
      const updatedList = { ...prev };
      if (updatedList[itemName]) {
        delete updatedList[itemName];
      }
      return updatedList;
    });
  };

  const [newItemInput, setNewItemInput] = useState<string>("");

  const handleNewEntry = () => {
    const inputParts = newItemInput.split(":").map((part) => part.trim());
    if (inputParts.length !== 2) {
      alert("Invalid input. Please enter in the format: Item Name : Price");
      return;
    }
    const name = inputParts[0];
    if (name in itemPrice) {
      alert(
        "Item already exists in the list. Please give a unique name or remove the item first."
      );
      return;
    }
    const price = inputParts[1];
    setItemPrice({
      ...itemPrice,
      [name]: {
        price: price,
        splitBetween: 0,
      },
    });
    setNewItemInput("");
  };

  return (
    <div className="text-white h-auto pt-[8rem] pb-[2.5rem] flex flex-wrap justify justify-center">
      <p className="text-center text-[3rem] w-[100%] pb-4">Make sure the receipt items have been correctly scanned.</p>

      <div className="flex flex-col min-h-max pb-[1rem]">
        <p className="text-[2rem] mb-[1.5rem] font-bold">Uploaded Image:</p>

        {imageURL && (
          <img
            src={imageURL}
            alt="Uploaded File From User"
            style={{
              width: "350px",
              height: "max",
              border: "2px solid #333",
              display: "flex",
            }}
          />
        )}
      </div>

      {/* display OCR result */}
      {ocrResult && (
        <div className=" mx-10">
          <p className="text-[2rem] mb-[0.5rem] font-bold">
            Receipt Items:
          </p>
          <p className="text-[1rem] mb-[0.5rem] text-gray-400">
            Remove items by pressing "X" to the left of them.
          </p>
          {Object.entries(itemPrice).map(([item, details], index) => (
            <p key={index} className="text-[1rem]">
              <button
                className="mr-2 text-red-500"
                onClick={() => removeFromDict(item)}
              >
                x
              </button>
              {item} : ${details.price}
            </p>
          ))}
          <p className="text-[1rem] mt-[1rem] font-bold">
            Enter new items here:
          </p>
          <p className="text-[1rem] text-gray-400">
            Use format <i>Item Name</i> : <i>Price</i>
          </p>
          <div className="mb-10 flex">
            <input
              value={newItemInput}
              onChange={(e) => setNewItemInput(e.target.value)}
              placeholder="Item Name : Price"
              style={{ color: "black", padding: "0.2rem" }}
            />
            <button
              onClick={handleNewEntry}
              className="ml-2 h-[10%] bg-[#289ba114] border-2 border-[#9acbce8b] border-solid hover:bg-[#289ba11e] hover:animate-pulse text-2xl p-2 rounded-md"
            >
              Add
            </button>
          </div>

          <Link
            className="h-[10%] bg-[#289ba114] border-2 border-[#9acbce8b] border-solid hover:bg-[#289ba11e] hover:animate-pulse text-2xl p-2 rounded-md"
            href="../split-page"
          >
            Next
            <ChevronRightCircle size={20} className="inline mb-1 ml-2" />
          </Link>
        </div>
      )}
    </div>
  );
}
