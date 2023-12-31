"use client";
import { useEffect, useState } from "react";
import * as React from "react";
import Link from "next/link";
import { ChevronRightCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface Item {
  price: string;
  splitBetween: number;
}

interface NameList {
  [name: string]: {
    [itemName: string]: number;
  };
}

type ItemMap = Record<string, Record<string, number>>;

const NextPage: React.FC = () => {
  const [retrievedNames, setRetrievedNames] = useState<string[]>([]);
  const [itemPrice, setItemPrice] = React.useState<Record<string, Item>>({});
  const [nameList, setNameList] = React.useState<NameList>({});
  const [nameTotals, setNameTotals] = React.useState<Record<string, number>>(
    {}
  );
  const [selectedName, setSelectedName] = useState<string | null>(null);

  useEffect(() => {
    // retrieve names array
    const storedNames = sessionStorage.getItem("names");
    if (storedNames) {
      const parsedNames = JSON.parse(storedNames);
      setRetrievedNames(parsedNames);
    }
    const storedOCR = sessionStorage.getItem("ocrResult");
    if (storedOCR) {
      const parsedOutput = JSON.parse(storedOCR);
      setItemPrice(parsedOutput);
    }
  }, []);

  React.useEffect(() => {
    const initNames: ItemMap = {};
    const initTotals: Record<string, number> = {};
    retrievedNames.forEach((name) => {
      initNames[name] = {};
      initTotals[name] = 0;
    });
    setNameTotals(initTotals);
    setNameList(initNames);
  }, [retrievedNames]);

  React.useEffect(() => {
    const newTotals: Record<string, number> = {};
    Object.keys(nameList).forEach((name) => {
      let total = 0;
      Object.keys(nameList[name]).forEach((item) => {
        if (itemPrice[item]) {
          total +=
            parseFloat(itemPrice[item].price) / itemPrice[item].splitBetween;
        }
      });
      newTotals[name] = total;
    });
    setNameTotals(newTotals);
  }, [nameList, itemPrice]);

  React.useEffect(() => {
    sessionStorage.setItem("nameList", JSON.stringify(nameList));
    sessionStorage.setItem("itemPrice", JSON.stringify(itemPrice));
    sessionStorage.setItem("nameTotals", JSON.stringify(nameTotals));
  }, [nameList, itemPrice, nameTotals]);

  // Function to handle line selection
  const handleLineClick = (name: string) => {
    if (selectedName) {
      if (nameList[selectedName][name]) {
        return;
      }
      // once name is clicked, add the receipt item under that name
      const tempNameList = { ...nameList };
      tempNameList[selectedName][name] = Number(itemPrice[name].price);
      setNameList(tempNameList);
      itemPrice[name].splitBetween += 1;
    }
  };

  const removeFromNameList = (name: string, itemName: string) => {
    setNameList((prevNameList) => {
      const updatedList = { ...prevNameList };
      if (updatedList[name] && updatedList[name][itemName]) {
        delete updatedList[name][itemName];
      }
      return updatedList;
    });
    itemPrice[itemName].splitBetween -= 1;
  };

  const handleNameClick = (name: string) => {
    setSelectedName(name);
  };

  return (
    <div className="h-auto min-h-screen text-white m-10 mt-[6rem]">
      <h1
        className="text-[2.5rem] flex justify justify-center
      max-sm:text-center">
        Let's Assign The Receipt Items!
      </h1>
      <p className="text-[1.25rem] text-center flex justify justify-center text-gray-300">
        Click on a person, and then click on an item to add it to their individual receipt<br/>
      </p>

      <div className="flex flex-row text-gray-200  mt-[3rem]">
        <ul className="flex flex-wrap w-[55%] h-[20%]">
          {/*height may be wrong*/}
          {retrievedNames.map((name, index) => (
            <li
              className={`pb-[3rem] pr-[2rem] mb-[1rem] ${
                selectedName === name ? "bg-cyan-900 rounded-xl p-4 mr-4" : ""
              }`}
              key={index}
            >
              <p
                className={`text-[1.5rem] mr-[1.5rem] mb-[1.5rem] font-bold ${
                  selectedName === name ? "text-white" : "text-gray-400"
                }`}
                onClick={() => handleNameClick(name)}
              >
                {name}'s Items
              </p>
              {/* Display the selected lines under the corresponding heading */}

              {nameList[name] &&
                Object.entries(nameList[name]).map(([item, cost], index) => (
                  <p key={index} className="text-[1rem] mb-[1rem]">
                    <button
                      className="mr-2 text-red-500"
                      onClick={() => removeFromNameList(name, item)}
                    >
                      x
                    </button>
                    {item} : $
                    {Math.ceil((cost / itemPrice[item].splitBetween) * 100) /
                      100}
                  </p>
                ))}
              <p className="text-[1rem] mb-[1rem]">
                Total: ${Math.ceil(nameTotals[name] * 100) / 100}
              </p>
            </li>
          ))}
        </ul>

        {/* Display OCR from split page */}
        {itemPrice && (
          <div className=" ml-[4rem]">
            <p className="text-[1.5rem] mb-[1.5rem] font-bold">
              Receipt Items:
            </p>
            {Object.entries(itemPrice).map(([itemName, itemDetails], index) => (
              <p
                key={index}
                className="text-[1rem] cursor-pointer mb-[1rem]"
                onClick={() => handleLineClick(`${itemName}`)}
              >
                {itemName} : ${itemDetails.price}
              </p>
            ))}
          </div>
        )}
      </div>
      <button
        className="bg-[#289ba158] border-2 border-[#9acbce] border-solid hover:bg-[#289ba11e] hover:animate-pulse text-2xl p-2 rounded-md"
        onClick={() => (window.location.href = "/share-page")}
      >
        Continue to Export
      </button>
    </div>
  );
};

export default NextPage;
