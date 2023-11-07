import Link from "next/link";
import { LiaReceiptSolid } from "react-icons/lia";

export default function OurService() {
  return (
    <div className=" w-screen text-white">
      <div className="flex justify justify-center flex-col">
        <hr className="mb-10 mx-[20%]" />

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
          Our product is for people who dine out or shop in groups often and who
          frequently struggle to divide expenses without error. CheckMate is a
          web app that scans your receipt and does all the math for you. Our
          product makes splitting receipts efficient, accurate, and fun!
          <br></br>
          How to use:
          <br></br>
          Uplaod a photo of your receipt and let us know who you're splitting with. 
          You'll be able to assign each splitter to their items, unless you want to split your bill evenly. 
          You'll get itemized lists of everyone's personal expenses and share the however you like!
        </p>
      </div>
    </div>
  );
}
