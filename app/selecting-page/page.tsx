"use client";
import { useEffect, useState } from "react";

const NextPage: React.FC = () => {
  // store the retrieved names
  const [retrievedNames, setRetrievedNames] = useState<string[]>([]);

  // store OCR result
  const [retrievedOCR, setRetrievedOCR] = useState<string | null>(null);

  // store the selected reciept items
  const [selectedLines, setSelectedLines] = useState<string[]>([]);

  // store the currently selected name
  const [selectedName, setSelectedName] = useState<string | null>(null);

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
      // once name is clicked, add the reciept item under that name
      setSelectedLines((prevSelectedLines) => [
        ...prevSelectedLines,
        `${selectedName}: ${line}`,
      ]);
    } else {
      // if no name is clicked
      setSelectedLines((prevSelectedLines) => [...prevSelectedLines, line]);
    }
  };

  //  handle name selection
  const handleNameClick = (name: string) => {
    setSelectedName(name);
  };

  return (
    <div className="text-white m-10 mt-[6rem]">
      <h1
        className="text-[2.5rem] flex justify justify-center
      max-sm:text-center
      "
      >
        Let's Assign The Receipt Items!
      </h1>
      <p className="text-[1rem] text-center flex justify justify-center text-gray-300">
        First click on the name you want to assign. <br /> Then click on their
        receipt items to list it under their name.
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

        {/* Display OCR from split page */}
        {retrievedOCR && (
          <div className=" ml-[4rem]">
            <p
              className="text-[1.5rem] mb-[1.5rem] font-bol
            max-sm:w-[100%]
            "
            >
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
      </div>
    </div>
  );
};

export default NextPage;
