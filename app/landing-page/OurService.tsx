"use client";
import Link from "next/link";
export default function OurService() {
  return (
    <div className="flex flex-row text-white">
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      <div className=" px-8 py-4 text-xl flex justify justify-center ">
        <p className="underline-offset-4 decoration-white">Our Service</p>

        <Link href="../split-page">Testing Link to Split Page</Link>
      </div>
    </div>
  );
}
