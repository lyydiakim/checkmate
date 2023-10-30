"use client";
import Image from "next/image";
import receipt from "@/public/images/receiptex.jpeg";
import { BsImage } from "react-icons/bs";
import { FiArrowRightCircle } from "react-icons/Fi";
import { PiUserCircleFill } from "react-icons/Pi";
import Link from "next/link";

export default function page() {
  return (
    <div
      className="flex  flex-row justify justify-center h-screen  mt-[10rem] text-white
      max-md:flex-col
    "
    >
      <div className="text-2xl mr-[5rem]">
        <p className="mb-4">
          Your Uploaded Image <BsImage className="inline" />
        </p>
        <Image className=" w-96" src={receipt} alt="receipt" />
      </div>

      <div className="bg-gray-300 bg-opacity-20 rounded-lg text-2xl h-[70%] w-[50%]">
        <p className="text-[#c6f3f5] text-3xl  text-bold p-10 ">
          How many people are splitting this receipt?
        </p>

        <div className="flex flex-row pl-[5rem] pb-[2rem] ">
          <PiUserCircleFill size={45} className="text-blue-500 mr-4" />
          <p className="mt-1">Meesh Af</p>
        </div>

        <div className="flex flex-row pl-[5rem] pb-[2rem] ">
          <PiUserCircleFill size={45} className="text-green-500 mr-4" />
          <p className="mt-1">Ice Spice Af</p>
        </div>
        <div className="flex flex-row pl-[5rem] pb-[2rem]">
          <PiUserCircleFill size={45} className="text-pink-500 mr-4" />
          <p className="mt-1">Princess Af</p>
        </div>

        <div className="relative bottom-0">
          <Link
            className="bg-[#289AA1] border-2 border-[#9acbce]  border-solid hover:border-dotted text-2xl p-2 rounded-md "
            href="../share-page"
          >
            Continue
            <FiArrowRightCircle className="inline ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
