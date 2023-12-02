"use client";
// import Tesseract from "tesseract.js";
// import { useRouter } from "next/navigation";

import Link from "next/link";
import React, { useEffect, useState } from "react";

import { ChevronRightCircle } from "lucide-react";
import { LiaUserCircleSolid } from "react-icons/lia";

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

export default function SplitPage() {
  //  const router = useRouter();
  const [numPeople, setNumPeople] = useState<number>(2); //set default number of people splitting to 2
  const [names, setNames] = useState<string[]>([]);
  const [randomColors, setRandomColors] = useState<string[]>([]);

  useEffect(() => {
    // make sure numPeople is non-negative
    const validNumPeople = Math.max(0, numPeople);

    // generate distinct colors for each user added
    const colors = Array(validNumPeople)
      .fill("")
      .map((_, index) => distinctColors[index % distinctColors.length]);
    setRandomColors(colors);
  }, [numPeople]);

  React.useEffect(()=>{
    sessionStorage.setItem("names", JSON.stringify(names));
  },[names])

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
    <div className="text-white pt-[6rem] h-screen m-10 flex flex-row justify justify-center">
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

        <div className="mt-[3rem]">
          <p className="text-[2rem] mb-[3rem]">
            Type in the names or initials of the people you are splitting this
            reciept with.
          </p>
          {/* Display input fields for each person */}
          {Array.from({ length: numPeople }).map((_, index) => (
            <div key={index} className="ml-[3rem] mb-[3rem]">
              <LiaUserCircleSolid
                className="inline-block mr-[1.5rem] w-10 h-10 rounded-full ml-2"
                style={{ color: randomColors[index] }}
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
      </div>
    </div>
  );
}
