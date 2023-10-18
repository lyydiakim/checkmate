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
    <div className="h-[90%]  text-white">
      <div className="w-100 flex flex-row">
        {/* Left */}
        <div
          className="w-1/2  text-[4rem] px-[7rem] py-[20rem] flex justify justify-center
          max-xl:text-[3.5rem] max-xl:px-[4.5rem] max-xl:py-[13rem] 
          max-lg:text-[3rem] max-lg:px-[3.5rem] max-lg:py-[10rem]
        "
        >
          <p>Make receipt splitting fun and efficient!</p>
        </div>

        {/* Right */}
        <div
          className="w-1/2 h-1/5 pt-[22rem] flex-col
        max-xl:pt-[16rem] max-lg:pt-[11rem]
        flex justify justify-center 
        "
        >
          <p className="flex justify-center text-2xl ">
            Upload Your Reciept Image Here
            <BsArrowDownCircleFill size={35} className="pl-2  inline" />
          </p>
          <input
            type="file"
            id="chooseFile"
            title=" "
            className=" mx-[22%] mt-2 p-10 rounded-xl border-2 
            contrast-more:border-slate-400 contrast-more:placeholder-slate-500
              transition-all duration-500 bg-gradient-to-br to-[#afdbd74b] via-[#427d784d] from-[#afdbd749] bg-size-200 hover:bg-right-bottom
            text-white text-2xl  outline-none 
 
              max-xl:text-lg  max-xl:mt-1
              max-lg:text-lg max-lg:mt-[0.5rem]
            "
          ></input>
        </div>
      </div>
    </div>
  );
}
