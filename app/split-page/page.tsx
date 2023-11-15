"use client";
import Image from "next/image";
import receipt from "@/public/images/receiptex.jpeg";
import { ChevronRightCircle } from "lucide-react";
import { UserCircle2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

// export default function page() {
//   return (
//     <div
//       className="flex  flex-row justify justify-center h-screen  mt-[10rem] text-white
//       max-md:flex-col
//     "
//     >
//       <div className="text-2xl mr-[5rem]">
//         {/* <p className="mb-4">
//           Your Uploaded Image <BsImage className="inline" />
//         </p> */}
//         <Image className="w-auto h-[70%]" src={receipt} alt="receipt" />
//       </div>

//       <div className="bg-gray-300 bg-opacity-20 rounded-lg  h-[70%] w-[50%]">
//         <p className="text-[#ffffff] text-[2.5rem]  text-bold p-10 ">
//           How many people are splitting this receipt?
//         </p>
//         <hr />
//         {/* Name Examples */}
//         <div className="flex flex-row">
//           <div className="text-gray-200 text-[1.5rem] pt-[3rem] space-y-[3rem]">
//             <div className=" pl-[5rem] ">
//               <p className="mt-1">
//                 <UserCircle2 size={45} className="inline text-blue-500 mr-4" />
//                 Meesh Af
//               </p>
//             </div>

//             <div className="pl-[5rem] ">
//               <p className="mt-1">
//                 <UserCircle2 size={45} className="inline text-green-500 mr-4" />
//                 Ice Spice Af
//               </p>
//             </div>
//             <div className="pl-[5rem]">
//               <p className="mt-1">
//                 <UserCircle2 size={45} className="inline text-pink-500 mr-4" />
//                 Princess Af
//               </p>
//             </div>
//           </div>

//           <div className="text-gray-200 text-[1.5rem] pt-[3rem]  space-y-[3rem]">
//             <div className=" pl-[5rem] ">
//               <p className="mt-1">
//                 <UserCircle2 size={45} className="inline text-red-500 mr-4" />
//                 Meesh Af
//               </p>
//             </div>

//             <div className="pl-[5rem] ">
//               <p className="mt-1">
//                 <UserCircle2
//                   size={45}
//                   className="inline text-indigo-500 mr-4"
//                 />
//                 Ice Spice Af
//               </p>
//             </div>
//             <div className="pl-[5rem]">
//               <p className="mt-1">
//                 <UserCircle2 size={45} className="inline text-sky-500 mr-4" />
//                 Princess Af
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="pl-[5rem] mt-[4rem]">
//           <Link
//             className="bg-[#289ba158] border-2 border-[#9acbce]  border-solid hover:bg-[#289ba11e] hover:animate-pulse text-2xl p-2 rounded-md "
//             href="../share-page"
//           >
//             Continue
//             <ChevronRightCircle size={20} className="inline mb-1 ml-2" />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// Import the useRouter hook
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function SplitPage() {
//   const router = useRouter();
//   const [ocrResult, setOcrResult] = useState<string | null>(null);
//   const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

//   useEffect(() => {
//     if (router.query) {
//       const { ocrResult, image } = router.query;
//       setOcrResult(ocrResult as string | null);
//       setImageDataUrl(image as string | null);
//     }
//   }, [router.query]);

//   return (
//     <div
//       className="flex  flex-row justify justify-center h-screen  mt-[10rem] text-white
//       max-md:flex-col
//     "
//     >
//       <div className="text-2xl mr-[5rem]">
//         {/* <p className="mb-4">
//           Your Uploaded Image <BsImage className="inline" />
//         </p> */}
//         <div>
//           {ocrResult && (
//             <div>
//               <strong>Formatted OCR Result:</strong>
//               <p>{ocrResult}</p>
//             </div>
//           )}
//           {imageDataUrl && (
//             <div>
//               <strong>Uploaded Image:</strong>
//               <img src={imageDataUrl} alt="Uploaded Receipt" />
//             </div>
//           )}
//         </div>
//         <Image className="w-auto h-[70%]" src={receipt} alt="receipt" />
//       </div>

//       <div className="bg-gray-300 bg-opacity-20 rounded-lg  h-[70%] w-[50%]">
//         <p className="text-[#ffffff] text-[2.5rem]  text-bold p-10 ">
//           How many people are splitting this receipt?
//         </p>
//         <hr />
//         {/* Name Examples */}
//         <div className="flex flex-row">
//           <div className="text-gray-200 text-[1.5rem] pt-[3rem] space-y-[3rem]">
//             <div className=" pl-[5rem] ">
//               <p className="mt-1">
//                 <UserCircle2 size={45} className="inline text-blue-500 mr-4" />
//                 Meesh Af
//               </p>
//             </div>

//             <div className="pl-[5rem] ">
//               <p className="mt-1">
//                 <UserCircle2 size={45} className="inline text-green-500 mr-4" />
//                 Ice Spice Af
//               </p>
//             </div>
//             <div className="pl-[5rem]">
//               <p className="mt-1">
//                 <UserCircle2 size={45} className="inline text-pink-500 mr-4" />
//                 Princess Af
//               </p>
//             </div>
//           </div>

//           <div className="text-gray-200 text-[1.5rem] pt-[3rem]  space-y-[3rem]">
//             <div className=" pl-[5rem] ">
//               <p className="mt-1">
//                 <UserCircle2 size={45} className="inline text-red-500 mr-4" />
//                 Meesh Af
//               </p>
//             </div>

//             <div className="pl-[5rem] ">
//               <p className="mt-1">
//                 <UserCircle2
//                   size={45}
//                   className="inline text-indigo-500 mr-4"
//                 />
//                 Ice Spice Af
//               </p>
//             </div>
//             <div className="pl-[5rem]">
//               <p className="mt-1">
//                 <UserCircle2 size={45} className="inline text-sky-500 mr-4" />
//                 Princess Af
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="pl-[5rem] mt-[4rem]">
//           <Link
//             className="bg-[#289ba158] border-2 border-[#9acbce]  border-solid hover:bg-[#289ba11e] hover:animate-pulse text-2xl p-2 rounded-md "
//             href="../share-page"
//           >
//             Continue
//             <ChevronRightCircle size={20} className="inline mb-1 ml-2" />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

function getRandomColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function SplitPage() {
  const router = useRouter();
  const [ocrResult, setOcrResult] = useState<string | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [numPeople, setNumPeople] = useState<number>(0);
  const [names, setNames] = useState<string[]>(Array(numPeople).fill(""));
  const [randomColors, setRandomColors] = useState<string[]>([]);

  const handleNumPeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumPeople = parseInt(e.target.value, 10) || 0;
    setNumPeople(newNumPeople);

    // Generate random colors once when the number of people changes
    const newRandomColors = Array.from({ length: newNumPeople }, () =>
      getRandomColor()
    );
    setRandomColors(newRandomColors);

    setNames(Array(newNumPeople).fill(""));
  };

  const handleNameChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newNames = [...names];
    newNames[index] = e.target.value;
    setNames(newNames);
  };

  return (
    <div className=" text-white ">
      {/* ... (your existing code) ... */}
      <p className="pt-[10rem] text-[2rem] text-bold p-10">
        How many people are splitting this receipt?
        <br />
        <input
          type="number"
          min="0"
          value={numPeople}
          onChange={handleNumPeopleChange}
          className="text-black"
        />
      </p>

      {Array.from({ length: numPeople }).map((_, index) => (
        <div key={index} className="pl-[5rem] mt-4">
          {randomColors[index]}
          <UserCircle2
            size={45}
            className={`inline text-${randomColors[index]} mr-[1rem]`} //this variable here isnt working
          />

          {/* using this to test what hex code is shown */}
          <input
            type="text"
            className="text-black"
            placeholder={`Person ${index + 1}`}
            value={names[index]}
            onChange={(e) => handleNameChange(index, e)}
          />

        </div>
      ))}

      <div className="pl-[5rem] mt-4">
        <Link
          className="bg-[#289ba158] border-2 border-[#9acbce]  border-solid hover:bg-[#289ba11e] hover:animate-pulse text-2xl p-2 rounded-md "
          href="../share-page"
        >
          Continue
          <ChevronRightCircle size={20} className="inline mb-1 ml-2" />
        </Link>
      </div>
    </div>
  );
}
