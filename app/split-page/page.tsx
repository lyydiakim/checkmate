"use client";
import Link from "next/link";
export default function page() {
  return (
    <div className="flex h-screen flex-row text-white">
      <div className="mt-[12rem] text-3xl flex flex-col">
        <p className="">Who are you splitting with?</p>
        <Link href="../selecting-page">Select</Link>
      </div>
    </div>
  );
}
