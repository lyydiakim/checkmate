"use client";
import Image from "next/image";
import photo1 from "@/public/images/upload-image.png";
import photo2 from "@/public/images/initial-scan.png";
import photo3 from "@/public/images/delete-items.png";
import photo4 from "@/public/images/adding-missed-items.png";
import photo5 from "@/public/images/increase-people.png";
import photo6 from "@/public/images/entering-names.png";
import photo7 from "@/public/images/click-on-person-then-click.png";
import photo8 from "@/public/images/moving-on.png";
import photo9 from "@/public/images/final-output.png";

export default function page() {
  return (
    <div>
        <div className="pt-[10rem] w-full text-white max-lg:pt-[8rem]">
            <div className="flex justify justify-center flex-col">
                <h1 className="text-4xl flex justify-center">How to Use CheckMate</h1>
                <div className="w-full flex flex-row">
                <p className="w-1/2 text-center text-[1.4rem] py-[3rem] px-[22rem] flex
                    max-xl:px-[17rem] 
                    max-lg:px-[7rem] max-lg:py-[2rem]
                    max-md:w-[100%]
                    max-sm:px-[3rem] max-sm:text-[1.3rem]">
                    Step 1: Upload
                </p>
                <Image className="flex self-center object-contain w-1/2 max-md:w-[100%]" src={photo1} alt="Photo of upload image button"/>
                </div>
            </div>
        </div>
    </div>
  );
}