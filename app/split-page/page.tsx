"use client";
import Image from "next/image";
import receipt from "@/public/images/receiptex.jpeg";
import { ChevronRightCircle } from "lucide-react";
import { UserCircle2 } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <div
      className="flex  flex-row justify justify-center h-screen  mt-[10rem] text-white
      max-md:flex-col
    "
    >
      <div className="text-2xl mr-[5rem]">
        {/* <p className="mb-4">
          Your Uploaded Image <BsImage className="inline" />
        </p> */}
        <Image className="w-auto h-[70%]" src={receipt} alt="receipt" />
      </div>

      <div className="bg-gray-300 bg-opacity-20 rounded-lg  h-[70%] w-[50%]">
        <p className="text-[#ffffff] text-[2.5rem]  text-bold p-10 ">
          How many people are splitting this receipt?
        </p>
        <hr />
        {/* Name Examples */}
        <div className="flex flex-row">
          <div className="text-gray-200 text-[1.5rem] pt-[3rem] space-y-[3rem]">
            <div className=" pl-[5rem] ">
              <p className="mt-1">
                <UserCircle2 size={45} className="inline text-blue-500 mr-4" />
                Meesh Af
              </p>
            </div>

            <div className="pl-[5rem] ">
              <p className="mt-1">
                <UserCircle2 size={45} className="inline text-green-500 mr-4" />
                Ice Spice Af
              </p>
            </div>
            <div className="pl-[5rem]">
              <p className="mt-1">
                <UserCircle2 size={45} className="inline text-pink-500 mr-4" />
                Princess Af
              </p>
            </div>
          </div>

          <div className="text-gray-200 text-[1.5rem] pt-[3rem]  space-y-[3rem]">
            <div className=" pl-[5rem] ">
              <p className="mt-1">
                <UserCircle2 size={45} className="inline text-red-500 mr-4" />
                Meesh Af
              </p>
            </div>

            <div className="pl-[5rem] ">
              <p className="mt-1">
                <UserCircle2
                  size={45}
                  className="inline text-indigo-500 mr-4"
                />
                Ice Spice Af
              </p>
            </div>
            <div className="pl-[5rem]">
              <p className="mt-1">
                <UserCircle2 size={45} className="inline text-sky-500 mr-4" />
                Princess Af
              </p>
            </div>
          </div>
        </div>

        <div className="pl-[5rem] mt-[4rem]">
          <Link
            className="bg-[#289ba158] border-2 border-[#9acbce]  border-solid hover:bg-[#289ba11e] hover:animate-pulse text-2xl p-2 rounded-md "
            href="../share-page"
          >
            Continue
            <ChevronRightCircle size={20} className="inline mb-1 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
