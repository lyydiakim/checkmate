"use client";
import React, { useEffect, useState } from "react";
import { ChevronRightCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const NextPage: React.FC = () => {
  // store the retrieved names
  const [retrievedNames, setRetrievedNames] = useState<string[]>([]);

  // store OCR result
  const [retrievedOCR, setRetrievedOCR] = useState<string | null>(null);
 
  // State to store the lines associated with each name
  const [linesByNames, setLinesByNames] = useState<{ [key: string]: string[] }>({});
  
  // State to store the currently selected name
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // retrieve names array
    const storedNames = sessionStorage.getItem("names");

    if (storedNames) {
      const parsedNames = JSON.parse(storedNames);
      setRetrievedNames(parsedNames);
    }

    // retrieve tesseract results
    const storedOCR = sessionStorage.getItem("ocrResult");
    if (storedOCR) {
      const ocrOutput = JSON.parse(storedOCR);
      setRetrievedOCR(ocrOutput);
    }
  }, []);

  // Function to handle line selection
  const handleLineClick = (line: string) => {
    if (selectedName) {
      // If a name is selected, add the line under that name
      setLinesByNames((prevLinesByNames) => ({
        ...prevLinesByNames,
        [selectedName]: [...(prevLinesByNames[selectedName] || []), line],
      }));
    } else {
      // if no name is clicked
      setSelectedLines((prevSelectedLines) => [...prevSelectedLines, line]);
    }
  };

  //  handle name selection
  const handleNameClick = (name: string) => {
    setSelectedName(name);
  };

  const handleContinue = () => {
    // Save linesByNames to sessionStorage
    sessionStorage.setItem('linesByNames', JSON.stringify(linesByNames));

    // Navigate to the SharePage
    router.push('/share-page');
  };

  return (
    <div className="text-white m-10 mt-[6rem]">
      <h1 className="text-[2.5rem] flex justify justify-center">
        Let's Assign The Receipt Items!
      </h1>
      <p className="text-[1rem] text-center flex justify justify-center text-gray-300">
        First click on the name you want to assign. <br /> Then click on their
        receipt items to list it under their name.
      </p>

      <div className="flex flex-row text-gray-200  mt-[3rem]">
        <ul className="flex flex-wrap h-[20%]">
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
                Assign {name}'s Items
              </p>
              {/* Display the selected lines under the corresponding heading */}
              {linesByNames[name]?.map((selectedLine, i) => (
                <p key={i} className="text-[1rem] mb-[1rem]">
                  {selectedLine}
                </p>
              ))}
            </li>
          ))}
        </ul>

        {/* Display OCR from split page */}
        {retrievedOCR && (
          <div className=" ml-[4rem]">
            <p className="text-[1.5rem] mb-[1.5rem] font-bold">
              Receipt Items:
            </p>
            {retrievedOCR.split("\n").map((line, index) => (
              <p
                key={index}
                className="text-[1rem] cursor-pointer mb-[1rem]"
                onClick={() => handleLineClick(line)}
              >
                {line}
              </p>
            ))}
          </div>
        )}
        
        /* Continue button */
        <div className="pl-[5rem] mt-[4rem]">
          <button
            onClick={handleContinue}
            className="bg-[#289ba158] border-2 border-[#9acbce] border-solid hover:bg-[#289ba11e] hover:animate-pulse text-2xl p-2 rounded-md"
          >
            Continue
            <ChevronRightCircle size={20} className="inline mb-1 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NextPage;
