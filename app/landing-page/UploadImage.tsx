"use client";
import { AiFillCamera } from "react-icons/ai";
import { BsArrowDownCircleFill } from "react-icons/bs";

export default function UploadImage() {
  function uploadImage() {
    $("button").on("click", function () {
      $("input").trigger("click");
    });
  }

  return (
    <div
      className="h-screen max-md:h-full flex flex-row  text-white
    max-md:flex-col
    "
    >
      {/* Left */}
      <div
        className="w-1/2  text-[4.5rem] px-[7rem] pt-[17rem] flex justify justify-center 
          max-xl:text-[4rem] max-xl:px-[4.5rem] max-xl:pt-[25%] 
          max-lg:px-[3.5rem] max-lg:pt-[30%]
          max-md:text-[3rem] max-md:px-[2rem] max-md:w-[100%] max-md:text-center max-md:pt-[10rem] 
        "
      >
        <p>Make receipt splitting fun and efficient!</p>
      </div>

      {/* Right */}
      <div
        className="w-1/2 h-1/5 pt-[25rem] flex-col
        flex justify justify-center 
        max-xl:pt-[27rem]
        max-lg:pr-[2rem] 
        max-md:pt-[5rem] max-md:w-[100%] max-md:ml-[1rem] max-md:pb-[7rem] max-md:max-h-min
   

        "
      >
        <p className="flex justify-center text-[1.7rem] max-sm:text-[1.3rem]">
          Upload Your Reciept Image Here
          <BsArrowDownCircleFill
            size={33}
            className="pl-2 mt-1 max-sm:mt-0 inline"
          />
        </p>
        <input
          type="file"
          id="chooseFile"
          title="Choose a File" // not working... matgin bottom needs to be changed
          className=" mx-[25%] my-2 pt-4 pb-12 px-10 rounded-xl border-2
              transition-all duration-500 bg-gradient-to-br to-[#afdbd74b] via-[#427d784d] from-[#afdbd749] bg-size-200 hover:bg-right-bottom
            text-white text-xl 
            max-xl:mx-[20%] 
            max-lg:mx-[20%] max-lg:pb-10
            max-md:mx-[10%] max-md:pb-4
            "
        ></input>
      </div>
    </div>
  );
}
