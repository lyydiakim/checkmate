"use client";
import { useEffect, useState } from "react";
import { ChevronRightCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Your Next.js page component
const NextPage: React.FC = () => {
  // State to store the retrieved names
  const [retrievedNames, setRetrievedNames] = useState<string[]>([]);
  // State for storing OCR result
  const [retrievedOCR, setRetrievedOCR] = useState<string | null>(null);
  // State to store the selected lines
  const [selectedLines, setSelectedLines] = useState<string[]>([]);
  // State to store the currently selected name
  const [selectedName, setSelectedName] = useState<string | null>(null);
  // State to store the selected lines
  const router = useRouter();


  useEffect(() => {
    // Retrieve names array
    const storedNames = sessionStorage.getItem("names");

    if (storedNames) {
      // Parse the JSON string back to an array
      const parsedNames = JSON.parse(storedNames);
      setRetrievedNames(parsedNames);
    }

    // Retrieve tesseract results
    const storedOCR = sessionStorage.getItem("ocrResult");
    if (storedOCR) {
      // Parse the JSON string back to a string
      const ocrOutput = JSON.parse(storedOCR);
      setRetrievedOCR(ocrOutput);
    }
  }, []);

  // Function to handle line selection
  const handleLineClick = (line: string) => {
    if (selectedName) {
      // If a name is selected, add the line under that name
      setSelectedLines((prevSelectedLines) => [
        ...prevSelectedLines,
        `${selectedName}: ${line}`,
      ]);
    } else {
      // If no name is selected, just add the line to the list
      setSelectedLines((prevSelectedLines) => [...prevSelectedLines, line]);
    }
  };

  // Function to handle name selection
  const handleNameClick = (name: string) => {
    // Set the selected name
    setSelectedName(name);
  };

  const handleContinue = () => {
    // Save selectedLines to sessionStorage
    sessionStorage.setItem('selectedLines', JSON.stringify(selectedLines));

    // Navigate to the SharePage
    router.push('/share-page', { selectedLines: JSON.stringify(selectedLines) });
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
                Assign {name}'s Items
              </p>
              {/* Display the selected lines under the corresponding heading */}
              {selectedLines
                .filter((selectedLine) => selectedLine.startsWith(`${name}:`))
                .map((selectedLine, i) => (
                  <p key={i} className="text-[1rem] mb-[1rem]">
                    <button
                      className="mr-2 text-red-500"
                      onClick={() =>
                        setSelectedLines((prevSelectedLines) =>
                          prevSelectedLines.filter(
                            (line) => line !== selectedLine
                          )
                        )
                      }
                    >
                      x
                    </button>
                    {selectedLine.replace(`${name}: `, "")}
                  </p>
                ))}
            </li>
          ))}
        </ul>

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
        {/* Continue button */}
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
