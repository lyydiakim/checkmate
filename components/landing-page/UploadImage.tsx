"use client";
import { AiFillCamera } from "react-icons/ai";
import { BsArrowDownCircleFill } from "react-icons/bs";
export default function UploadImage() {
  return (
    <div className="h-screen  text-white">
      <div className="w-100 flex flex-row">
        <div className="w-1/2 text-[4rem] px-[7rem] py-[20rem] flex justify justify-center">
          <p>Make receipt splitting fun and efficient!</p>
        </div>
        <div className="w-1/2 h-1/5 pt-[22rem] flex justify justify-center">
          <button
            //   className="w-1/2 h-1/5 border-2 hover:border-[#5DC6A9] hover:-translate-y-1 hover:scale-105
            // duration-300  rounded-lg flex justify-center items-center"

            className=" w-[60%] m-2 p-10 text-gray-500 rounded-xl border-2
          transition-all duration-500 bg-gradient-to-br to-[#afdbd74b] via-[#427d784d] from-[#afdbd749] bg-size-200 hover:bg-right-bottom"
          >
            <a
              href=""
              title="upload image"
              // target="_blank"
              className="text-white opacity-90 text-3xl  flex justify justify-center font-dm-sans font-bold tracking-tight items-center gap-3"
            >
              <AiFillCamera size={30} /> Upload Your Receipt
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}
