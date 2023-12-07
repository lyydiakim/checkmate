"use client";
import Image from "next/image";
import Link from "next/link";
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
          <div className="py-[2rem] flex flex-row max-md:flex-col max-md:pt-[4rem]"> {/* Step 1*/}
            <div className="w-1/2 px-[6rem] flex flex-col justify justify-center max-md:w-[100%] max-md:text-center">
              <p className="text-[1.5rem]"><b>Step 1: Upload Image</b></p>
              <p className="text-[1.1rem] pt-3">Upload a clear .jpeg or .png file containing an image of your receipt from your device.</p>
              <p className="text-[1.1rem] pt-2">After it is uploaded, CheckMate will automatically proceed to the next page. You may need to wait for the AI to finish processing the text.</p>
            </div>
            <div className="w-1/2 flex-col flex justify justify-center max-md:w-[100%] max-md:pt-[3rem]">
              <Image className="flex self-center object-contain  w-5/6" src={photo1} alt="Photo of upload image button."/>
            </div>
          </div>
          <div className="py-[2rem] flex flex-row max-md:flex-col"> {/* Step 2*/}
            <div className="w-1/2 px-[6rem] flex flex-col justify justify-center max-md:w-[100%] max-md:text-center">
              <p className="text-[1.5rem]"><b>Step 2: Check for Accuracy</b></p>
              <p className="text-[1.1rem] pt-3">We are working with the best technology we can, but it doesn't scan everything accurately.</p>
              <p className="text-[1.1rem] pt-2">Once the image loads in, please take a minute to check for accuracy and any extra or missing items.</p>
            </div>
            <div className="w-1/2 flex-col flex justify justify-center max-md:w-[100%] max-md:pt-[3rem]">
              <Image className="flex self-center object-contain  w-5/6" src={photo2} alt="Photo of a receipt next to a list of items from the receipt."/>
            </div>
          </div>
          <div className="py-[2rem] flex flex-row max-md:flex-col"> {/* Step 3*/}
            <div className="w-1/2 px-[6rem] flex flex-col justify justify-center max-md:w-[100%] max-md:text-center">
              <p className="text-[1.5rem]"><b>Step 3: Removing Items</b></p>
              <p className="text-[1.1rem] pt-3">Press the red x next to an item to remove it from the list.</p>
            </div>
            <div className="w-1/2 flex-col flex justify justify-center max-md:w-[100%] max-md:pt-[3rem]">
              <Image className="flex self-center w-3/5" src={photo3} alt="Photo of a list of receipt items titled 'Receipt Items' that each have a red x on their left side."/>
            </div>
          </div>
          <div className="py-[2rem] flex flex-row max-md:flex-col"> {/* Step 4*/}
            <div className="w-1/2 px-[6rem] flex flex-col justify justify-center max-md:w-[100%] max-md:text-center">
              <p className="text-[1.5rem]"><b>Step 4: Add New Items</b></p>
              <p className="text-[1.1rem] pt-3">You can add any extra items at this point if anything was missed in the initial scan or you want to add an additional cost.</p>
              <p className="text-[1.1rem] pt-2">The correct format is <i>Name : X.XX</i>, in this case we entered JALAPENO POPPER : 5.00.</p>
            </div>
            <div className="w-1/2 flex-col flex justify justify-center max-md:w-[100%] max-md:pt-[3rem]">
              <Image className="flex self-center object-contain  w-5/6" src={photo4} alt="Photo of a receipt with a list of items on the right and a form and button next to the receipt."/>
            </div>
          </div>
          <div className="py-[2rem] flex flex-row max-md:flex-col"> {/* Step 5*/}
            <div className="w-1/2 px-[6rem] flex flex-col justify justify-center max-md:w-[100%] max-md:text-center">
              <p className="text-[1.5rem]"><b>Step 5: Add All Splitters</b></p>
              <p className="text-[1.1rem] pt-3">Count how many people in total you want to split the receipt, including yourself.</p>
              <p className="text-[1.1rem] pt-2">You can use the arrows to adjust the number or manually type a number in.</p>
            </div>
            <div className="w-1/2 flex-col flex justify justify-center max-md:w-[100%] max-md:pt-[3rem]">
              <Image className="flex self-center object-contain  w-5/6" src={photo5} alt="Photo of a receipt with a list of items on the right and a form and button next to the receipt."/>
            </div>
          </div>
          <div className="py-[2rem] flex flex-row max-md:flex-col"> {/* Step 6*/}
            <div className="w-1/2 px-[6rem] flex flex-col justify justify-center max-md:w-[100%] max-md:text-center">
              <p className="text-[1.5rem]"><b>Step 6: Adding Names</b></p>
              <p className="text-[1.1rem] pt-3">Enter a name or alias for each person. If one is not provided, they will not be included in the next step. When ready, press the 'Next' button.</p>
            </div>
            <div className="w-1/2 flex-col flex justify justify-center max-md:w-[100%] max-md:pt-[3rem]">
              <Image className="flex self-center object-contain  w-5/6" src={photo6} alt="Photo of a receipt with a list of items on the right and a form and button next to the receipt."/>
            </div>
          </div>
          <div className="py-[2rem] flex flex-row max-md:flex-col"> {/* Step 7*/}
            <div className="w-1/2 px-[6rem] flex flex-col justify justify-center max-md:w-[100%] max-md:text-center">
              <p className="text-[1.5rem]"><b>Step 7: Assign Items</b></p>
              <p className="text-[1.1rem] pt-3">The fastest way to split items is to click one person's name and then click on each item from the receipt that you want them to pay for.</p>
              <p className="text-[1.1rem] pt-2">If the same item is added to multiple people, the price will be split evenly between them.</p>
              <p className="text-[1.1rem] pt-2">Currently there is no way in CheckMate to split tax or tip based on the subtotal per person, but it can be split evenly between everyone by adding 'tax' or 'tip' items to each splitter.</p>
            </div>
            <div className="w-1/2 flex-col flex justify justify-center max-md:w-[100%] max-md:pt-[3rem]">
              <Image className="flex self-center object-contain  w-5/6" src={photo7} alt="Photo of a receipt with a list of items on the right and a form and button next to the receipt."/>
            </div>
          </div>
          <div className="py-[2rem] flex flex-row max-md:flex-col"> {/* Step 8*/}
            <div className="w-1/2 px-[6rem] flex flex-col justify justify-center max-md:w-[100%] max-md:text-center">
              <p className="text-[1.5rem]"><b>Step 8: Finishing</b></p>
              <p className="text-[1.1rem] pt-3">When all items have been split as desired, you can press the 'Continue to Export' button.</p>
            </div>
            <div className="w-1/2 flex-col flex justify justify-center max-md:w-[100%] max-md:pt-[3rem]">
              <Image className="flex self-center object-contain  w-5/6" src={photo8} alt="Photo of a receipt with a list of items on the right and a form and button next to the receipt."/>
            </div>
          </div>
          <div className="py-[2rem] flex flex-row max-md:flex-col"> {/* Step 9*/}
            <div className="w-1/2 px-[6rem] flex flex-col justify justify-center max-md:w-[100%] max-md:text-center">
              <p className="text-[1.5rem]"><b>Step 9: You're Done!</b></p>
              <p className="text-[1.1rem] pt-3">At this point, you can select one of our many export options to share individual receipts with everyone.</p>
              <p className="text-[1.1rem] pt-2">CheckMate can copy the text for one person or all of them to your clipboard which can then be pasted like any normal text on your device.</p>
              <p className="text-[1.1rem] pt-2">We also allow users to download a pdf which will contain the same information as 'Copy Lists' but it will be stored as a file on your device.</p>
            </div>
            <div className="w-1/2 flex-col flex justify justify-center max-md:w-[100%] max-md:pt-[3rem]">
              <Image className="flex self-center object-contain  w-2/3" src={photo9} alt="Photo of a receipt with a list of items on the right and a form and button next to the receipt."/>
            </div>
          </div>
          <p className="text-center text-2xl px-[2rem] pt-[2rem] pb-[4rem]">
          We hope you enjoyed this tutorial! Get started with CheckMate <Link href="/" className="underline underline-offset-4 hover:text-[#99f6e4]">here.</Link>
        </p>  
        </div>
      </div>
    </div>
  );
}