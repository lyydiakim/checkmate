"use client";
import Link from "next/link";
import Image from "next/image";
import groupPhoto from "@/public/images/groupphoto.png";
import { BsFillPersonFill } from "react-icons/bs"
import OurService from "@/app/about/OurService";

export default function page() {
  return (
    <div>
    <div
      className="max-md:h-full flex flex-row  text-white max-md:flex-col">
      <div className="w-1/2  text-[2.5rem] px-[7rem] pt-[15%] flex justify justify-center 
          max-xl:text-[2rem] max-xl:px-[4.5rem] max-xl:pt-[20%] 
          max-lg:px-[3.5rem] max-lg:pt-[20%]
          max-md:text-[2rem] max-md:px-[2rem] max-md:w-[100%] max-md:text-center max-md:pt-[8rem]">
        <p>Hello from Santa Clara University! We've been working on CheckMate for the past few months, and we hope you enjoy it!
          <br/><br/>
          Xoxo,
          <br/>
          Morgan, Lydia, Michelle, Chloé, Alex, and Mark
        </p>
      </div>
      <div className="w-1/2 h-1/5 pt-[13%] flex-col
        flex justify justify-center 
        max-xl:pt-[20%]
        max-lg:pr-[2rem] max-lg:pt-[12rem]
        max-md:pt-[5rem] max-md:w-[100%] max-md:ml-[1rem] max-md:pb-[7rem] max-md:max-h-min max-md:pt-[4rem]">

        <Image className="flex self-center object-contain  w-5/6" src={groupPhoto} alt="Photograph of the entire CheckMate team."/>
      </div>
    </div>

<div className="pt-[10rem] w-screen text-white max-md:pt-[0.5rem]">
      <div className="flex justify justify-center flex-col">

        <h1 className="text-3xl border-[3px] w-[18rem] py-3 px-4  mx-auto rounded-lg flex justify-center">
          <BsFillPersonFill size={35} className="inline ml-2" />
          The Team
        </h1>

        <p className="text-center text-[1.4rem] py-[3rem] px-[22rem] 
          max-xl:px-[17rem] 
          max-lg:px-[7rem] max-lg:py-[2rem]
          max-sm:px-[3rem] max-sm:text-[1.3rem]">
        Our team is composed of six members who are studying computer science.
        We decided that, as college students, splitting receipts is often
        complicated and inefficient. We have been developing CheckMate as an
        AI-powered solution to this common problem. 
        </p>
      </div>
    </div>

    <OurService />
    
    </div>
  );
}