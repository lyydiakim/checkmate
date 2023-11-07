"use client";
import Link from "next/link";
import OurService from "@/app/about/OurService";
export default function page() {
  return (
    <div>

<div
      className="h-screen max-md:h-full flex flex-row  text-white max-md:flex-col">
      {/* Left */}
      <div
        className="w-1/2  text-[2rem] px-[7rem] pt-[17rem] flex justify justify-center 
          max-xl:text-[2.5rem] max-xl:px-[4.5rem] max-xl:pt-[25%] 
          max-lg:px-[3.5rem] max-lg:pt-[30%]
          max-md:text-[2rem] max-md:px-[2rem] max-md:w-[100%] max-md:text-center max-md:pt-[10rem]">
        <p>Hello from Santa Clara University! We are an awesome group of software engineers! We LOVE coding and splitting expenses. We hope you enjpy CheckMates!
          <br></br>
          With Love, <br></br>
          Alex, Chloé, Lydia, Mark, Michelle, and Morgan 
        </p>
      </div>

      {/* Right */}
      <div
        className="w-1/2 h-1/5 pt-[25rem] flex-col
        flex justify justify-center 
        max-xl:pt-[27rem]
        max-lg:pr-[2rem] 
        max-md:pt-[5rem] max-md:w-[100%] max-md:ml-[1rem] max-md:pb-[7rem] max-md:max-h-min
        ">
        <img className="flex self-center object-contain  w-5/6" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png" alt="Photograph of the entire CheckMates team."></img>
      </div>
    </div>
    <OurService />
    
    </div>
  );
}
