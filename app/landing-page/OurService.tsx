"use client";
import Link from "next/link";
export default function OurService() {
  return (
    <div className="flex flex-row text-white">
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      <div className=" px-8 py-4 text-3xl flex flex-col justify justify-center ">
        <p className="underline-offset-4 decoration-white">Our Service</p>

        <Link href="../split-page">Testing Link to Split Page</Link>

        <p className="text-xl">
          Our product is for people who dine out or shop in groups often and who
          frequently struggle to divide expenses without error. CheckMate is a
          web app that scans your receipt and does of all the math for you. Our
          makes splitting receipts efficient, accurate, and fun!
        </p>
      </div>
    </div>
  );
}
