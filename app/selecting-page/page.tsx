"use client";
import Link from "next/link";
export default function page() {
  return (
    <div className="flex h-screen flex-row text-black">
      <p
        className="text-center text-[1.4rem] py-[3rem] px-[22rem] 
          max-xl:px-[17rem] 
          max-lg:px-[7rem] max-lg:py-[2rem]
          max-sm:px-[3rem] max-sm:text-[1.3rem] text-white"
      >
        {" "}
        Please assign splitters to items. <br></br>
        Click
        <Link href="../share-page">
          <span className="text-orange"> next </span>
        </Link>
        to go to share page.
      </p>
    </div>
  );
}
