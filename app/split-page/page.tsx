// havent changed the tesseract stuff ~ just displaying the parsed text atm
// add functionality to change the tesseract text
// uploaded image is saved in session storage under fileURL and tesseract stuff saved under ocrResult
"use client";
import Tesseract from "tesseract.js";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRightCircle } from "lucide-react";

export default function UploadImage() {
  //  const router = useRouter();
  const [numPeople, setNumPeople] = useState<number>(2); //set default number of people splitting to 2
  const [names, setNames] = useState<string[]>([]);
  const [randomColors, setRandomColors] = useState<string[]>([]);
  const [imageURL, setImageURL] = useState<string | null>(null); // storing the image URL
  const [ocrResult, setOcrResult] = useState<string | null>(null); // storing OCR result

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
        sessionStorage.setItem("ocrResult", data.text); //store the ocrResult to use on selecting-page
      });
    }
  }, []);

  useEffect(() => {
    // Save names array + OCR in sessionStorage so that you can use the names on the next page
    sessionStorage.setItem("names", JSON.stringify(names));
    sessionStorage.setItem("ocrResult", JSON.stringify(ocrResult));
  }, [names, ocrResult]);

  // useEffect(() => {
  //   // make sure numPeople is non-negative
  //   const validNumPeople = Math.max(0, numPeople);

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

  return (
    <div className="text-white pt-[6rem] m-10 flex flex-row max-sm:flex-col">
      <div className="mx-4">
        <p
          className="text-[2rem] mb-[1.5rem] font-bold
        max-sm:text-center
        "
        >
          Uploaded Image
        </p>

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
        <div className="w-[30%] max-sm:w-[100%] max-sm:text-center mx-4">
          <p
            className="text-[2rem] font-bold
          max-sm:mt-[3rem]
          "
          >
            Does the Receipt Look Correct?
          </p>

          <p className="text-[1rem]  mb-[1.5rem] max-sm:text-center flex justify justify-center text-gray-300">
            Use the column on the right to adjust the price if it's been read
            incorrectly.
          </p>

          {ocrResult.split("\n").map(
            (
              line,
              index //display each receipt item on new line
            ) => (
              <p key={index} className="text-[1rem] text-left">
                {line}
              </p>
            )
          )}
        </div>
      )}

      <div className=" lg:ml-[3rem] w-[50%] max-sm:text-center">
        <div className="flex flex-col">
          <p
            className="inline-flex  text-[2rem] font-bold 
          max-sm:mt-[3rem]

        "
          >
            How many people are splitting this receipt?{" "}
          </p>
          <p className="text-[1rem] text-gray-400">
            Use the arrows to adjust the number of people.
          </p>
        </div>
        <div className="flex flex-col">
          <input
            className="inline-flex text-black w-[10%] border-blue-500 border-2 text-[1.5rem] rounded-xl font-bold p-2
            max-sm:w-[20%]
            "
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
        </div>

        <div className="pt-[3rem]">
          <p className=" text-[1.3rem]">
            Are you splitting the receipt evenly or unevenly?
          </p>
          <label className="mr-4">
            <input
              className="mr-2
              focus:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 "
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
              className=" mr-2 focus:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            <p className="text-[1.3rem] mb-[3rem]  max-sm:justify max-sm:justify-center">
              Let's split this receipt {selectedOption}!
              <br />
              Type in the names/initials of the people you are splitting this
              reciept with.
            </p>
            {/* Display input fields for each person */}
            {Array.from({ length: numPeople }).map((_, index) => (
              <input
                key={index}
                className="text-black p-2 rounded-xl h-[2.5rem]
               ml-[3rem] mb-[3rem]
                 
                  "
                type="text"
                placeholder={`Person ${index + 1}'s name`}
                value={names[index] || ""}
                onChange={(e) => handleNameChange(index, e.target.value)}
              />
            ))}
            <div className=" mt-4">
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
}
