"use client";
// app/share-page/page.tsx
// import html2pdf from 'html2pdf.js';
import { useState, useEffect } from "react";
import * as React from "react";
import "global";
let html2pdfModule: Promise<{ default: any }> | undefined;
import { CopyToClipboard } from "react-copy-to-clipboard"; // Import the CopyToClipboard component
import { format } from "path";

if (typeof window !== "undefined") {
  // Dynamically import html2pdf.js only on the client side
  html2pdfModule = import("html2pdf.js");
}

interface Item {
  price: string;
  splitBetween: number;
}

interface NameList {
  [name: string]: {
    [itemName: string]: number;
  };
}

const SharePage: React.FC = () => {
  const [copied, setCopied] = useState(false); // State to track whether text is copied
  const [itemPrice, setItemPrice] = React.useState<Record<string, Item>>({});
  const [nameList, setNameList] = React.useState<NameList>({});
  const [nameTotals, setNameTotals] = React.useState<Record<string, number>>(
    {}
  );

  // State variables to track copy status for each list
  const [copiedLists, setCopiedLists] = useState<boolean[]>(
    Array.from({ length: 10 }, () => false)
  );

  useEffect(() => {
    // Retrieve lines by names from sessionStorage
    const getNameList = sessionStorage.getItem("nameList");
    if (getNameList) {
      const parsedNameList = JSON.parse(getNameList);
      setNameList(parsedNameList);
    }
    const getItemPrice = sessionStorage.getItem("itemPrice");
    if (getItemPrice) {
      const parsedItemPrice = JSON.parse(getItemPrice);
      setItemPrice(parsedItemPrice);
    }
    const getNameTotals = sessionStorage.getItem("nameTotals");
    if (getNameTotals) {
      const parsedNameTotals = JSON.parse(getNameTotals);
      setNameTotals(parsedNameTotals);
    }
  }, []);

  const getTextContents = () => {
    const linesWithNames: string[] = [];
    Object.keys(nameList).forEach((name) => {
      linesWithNames.push(formatNameListtoString(name));
    });
    return linesWithNames.join("\n\n");
  };

  const formatNameListtoString = (name: string) => {
    const items = nameList[name];
    const formattedItems = Object.entries(items).map(
      ([item, cost]) =>
        `${item}: ${
          Math.ceil((cost / itemPrice[item].splitBetween) * 100) / 100
        }`
    );
    const totalString = `Total: ${nameTotals[name].toFixed(2)}`;
    return `${name}'s Items:\n${formattedItems.join("\n")}\n${totalString}`;
  };

  const pdfOptions = {
    margin: 10,
    filename: "parsed_receipt.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  const handleExportPDF = async () => {
    const html2pdfModule = await import("html2pdf.js");
    if (html2pdfModule) {
      try {
        const html2pdf = html2pdfModule.default;

        if (html2pdf) {
          const pdfContent = `<pre>${getTextContents()}</pre>`;
          html2pdf().from(pdfContent).set(pdfOptions).save();
        } else {
          console.error("html2pdf.js is not available");
        }
      } catch (error) {
        console.error("Failed to load html2pdf.js", error);
      }
    }
  };

  const handleCopyLists = () => {
    const allText = getTextContents();
    navigator.clipboard
      .writeText(allText)
      .then(() => setCopied(true))
      .catch((error) => console.error("Copy failed:", error));
  };

  const handleCopyList = (name: string, index: number) => {
    const toCopy = formatNameListtoString(name);
    navigator.clipboard
      .writeText(toCopy)
      .then(() => {
        const newCopiedLists = Array.from({ length: 10 }, () => false);
        newCopiedLists[index] = true;
        setCopiedLists(newCopiedLists);
      })
      .catch((error) => console.error("Copy failed:", error));
  };

  return (
    <div className="text-white m-10 mt-[6rem]">
      <h1 className="text-teal text-[1.5rem] flex justify-center">
        Here's your receipt information based on your selection.
      </h1>

      {/* Lines by names content */}
      {nameList &&
        Object.keys(nameList).map((name, index) => (
          <div
            key={index}
            className="text-gray-200 mt-4 flex flex-col items-center"
          >
            <div className="w-full max-w-md text-center">
              <h2
                className="text-gray-200 font-bold"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {name}'s Items:{" "}
              </h2>
            </div>
            <ul>
              {nameList[name] &&
                Object.entries(nameList[name]).map(
                  ([item, cost], lineIndex) => (
                    <li key={lineIndex}>
                      {item} : $
                      {Math.ceil((cost / itemPrice[item].splitBetween) * 100) /
                        100}
                    </li>
                  )
                )}
              <p className="text-[1rem] mb-[1rem]">
                Total: ${Math.ceil(nameTotals[name] * 100) / 100}
              </p>
            </ul>

            {/* Copy the entire list when clicking on the button at the end of the list */}
            <CopyToClipboard
              text={formatNameListtoString(name)}
              onCopy={() => handleCopyList(name, index)}
            >
              <div
                className={`bg-[#289ba158] cursor-pointer border-2 border-[#9acbce] border-solid hover:bg-[#289ba11e] hover:animate-pulse text-xs p-1 rounded-md mt-2 ${
                  copiedLists[index] ? "text-green-500" : ""
                }`}
              >
                {copiedLists[index] ? "Copied!" : "Copy"}
              </div>
            </CopyToClipboard>
          </div>
        ))}

      <br></br>
      <div className="text-[1rem] flex justify-center">
        <p>How would you like share this with your checkmates?</p>
      </div>

      {/* Buttons container */}
      <div className="mt-4 flex justify-center space-x-4">
        {/* Export as PDF button */}
        <button
          onClick={handleExportPDF}
          className="bg-[#289ba158] border-2 border-[#9acbce] border-solid hover:bg-[#289ba11e] hover:animate-pulse text-2xl p-2 rounded-md"
        >
          Download as PDF
        </button>

        {/* Copy Lists button */}
        <CopyToClipboard text={"weeeeeeee"}>
          <button
            onClick={handleCopyLists}
            className="bg-[#289ba158] border-2 border-[#9acbce] border-solid hover:bg-[#289ba11e] hover:animate-pulse text-2xl p-2 rounded-md"
          >
            Copy Lists
          </button>
        </CopyToClipboard>
        {copied && <p className="text-green-500">Lists copied to clipboard!</p>}
      </div>
    </div>
  );
};

export default SharePage;