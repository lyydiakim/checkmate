// havent changed the tesseract stuff ~ just displaying the parsed text atm
// add functionality to change the tesseract text
// uploaded image is saved in session storage under fileURL and tesseract stuff saved under ocrResult
"use client";
import Tesseract from "tesseract.js";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRightCircle } from "lucide-react";

const distinctColors = [
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
  const router = useRouter();
  const [numPeople, setNumPeople] = useState<number>(2);
  const [names, setNames] = useState<string[]>([]);
  const [randomColors, setRandomColors] = useState<string[]>([]);
  const [imageURL, setImageURL] = useState<string | null>(null); // State for storing the image URL
  const [ocrResult, setOcrResult] = useState<string | null>(null); // State for storing OCR result

  // Event handler for radio button change
  const [selectedOption, setSelectedOption] = useState("");

  // State to track whether an option has been clicked
  const [optionClicked, setOptionClicked] = useState(false);

  // Event handler for radio button change
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
    setOptionClicked(true);
  };

  useEffect(() => {
    // retrieve the image URL from session storage
    const storedImageURL = sessionStorage.getItem("fileUrl");
    setImageURL(storedImageURL);

    // Perform OCR on the image
    if (storedImageURL) {
      Tesseract.recognize(
        storedImageURL,
        "eng",
        { logger: (info) => console.log(info) } // can see the progress in the console
      ).then(({ data }) => {
        setOcrResult(data.text); //setting ocrResult here!!
        sessionStorage.setItem("ocrResult", data.text);
      });
    }
  }, []);

  useEffect(() => {
    // Save names array and OCR result in sessionStorage
    sessionStorage.setItem("names", JSON.stringify(names));
    sessionStorage.setItem("ocrResult", JSON.stringify(ocrResult));
  }, [names, ocrResult]);

  useEffect(() => {
    // Ensure numPeople is non-negative
    const validNumPeople = Math.max(0, numPeople);

    // Generate distinct colors when the number of people changes
    const colors = Array(validNumPeople)
      .fill("")
      .map((_, index) => distinctColors[index % distinctColors.length]);
    setRandomColors(colors);
  }, [numPeople]);

  // Event handler for changing a person's name
  const handleNameChange = (index: number, newName: string) => {
    const updatedNames = [...names];
    updatedNames[index] = newName;
    setNames(updatedNames);
  };

  useEffect(() => {
    // Update names array when numPeople changes
    setNames((prevNames) => prevNames.slice(0, numPeople));
  }, [numPeople]);

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
          <p className="text-[2rem] mb-[1.5rem] font-bold">OCR Result:</p>
          {ocrResult.split("\n").map((line, index) => (
            <p key={index} className="text-[1rem]">
              {line}
            </p>
          ))}
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
