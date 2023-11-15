"use client";
import Image from "next/image";
import groupPhoto from "@/public/images/groupphoto.png";
import { BsFillPersonFill } from "react-icons/bs";

import { LiaReceiptSolid } from "react-icons/lia";

export default function page() {
  return (
    <div className="h-screen text-white text-2xl pt-[8rem] ">
      <div className="flex flex-row">
        {/* Left Side */}
        <div className="flex flex-col px-[3rem] pt-[5rem] w-1/2">
          <h2 className="text-3xl"> Hello from Santa Clara University!</h2>
          <p className="text-gray-200 pt-4">
            Our team is composed of six members who are studying computer
            science. We decided that, as college students, splitting receipts is
            often complicated and inefficient. We have been developing
            CheckMate$ as an AI-powered solution to this common problem.
            {/* Not sure which one u guys wanted to use so i commented out this one in case u want to use somewher else */}
            {/* <br /> We are an awesome group of software engineers! We LOVE coding
            and splitting expenses. We hope you enjoy CheckMates!
            <br />
            Xoxo ,
            <br /> <br />
            Alex, Chloé, Lydia, Mark, Michelle, and Morgan */}
          </p>
        </div>
        {/* Right Side */}

        <div className="flex w-1/2 mx-[5rem] flex-col ">
          <h1 className="text-3xl border-[3px] w-[18rem] py-3 px-4  mx-auto rounded-lg flex justify-center">
            <BsFillPersonFill size={35} className="inline ml-2" />
            The Team
          </h1>

          <Image
            className="mt-[3rem] flex justify justify-center"
            src={groupPhoto}
            alt="group photo"
          />
        </div>
      </div>
      <div className="pb-[15rem]">
        <hr className="mt-[7rem] mb-10 mx-[20%]" />

        <div className="flex justify justify-center flex-col">
          <h1 className="text-3xl border-[3px] w-[18rem] py-3 px-4  mx-auto rounded-lg flex justify-center">
            Our Service
            <LiaReceiptSolid size={35} className="inline ml-2" />
          </h1>

          <p
            className="text-center text-[1.4rem] py-[3rem] px-[22rem] 
          max-xl:px-[17rem] 
          max-lg:px-[7rem] max-lg:py-[2rem]
          max-sm:px-[3rem] max-sm:text-[1.3rem]"
          >
            Our product is for people who dine out or shop in groups often and
            who frequently struggle to divide expenses without error. CheckMate
            is a web app that scans your receipt and does all the math for you.
            Our product makes splitting receipts efficient, accurate, and fun!
            <br />
            <br />
            How To Use:
            <br />
            Upload a photo of your receipt and let us know who you're splitting
            with. You'll be able to assign each splitter to their items, unless
            you want to split your bill evenly. You'll get itemized lists of
            everyone's personal expenses and share the however you like!
          </p>
        </div>
      </div>
    </div>
  );
}
