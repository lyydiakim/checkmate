// "use client";
// import Link from "next/link";
// export default function page() {
//   return (
//     <div className="flex h-screen flex-row text-white">
//       <p
//           className="text-center text-[1.4rem] py-[3rem] px-[22rem]
//           max-xl:px-[17rem]
//           max-lg:px-[7rem] max-lg:py-[2rem]
//           max-sm:px-[3rem] max-sm:text-[1.3rem] text-white"
//         > Who are you splitting with? <br></br>
//         Click
//         <Link href="../share-page">
//         <span className="text-orange"> next </span>
//         </Link>
//         to go to selecting page.
//         </p>
//     </div>
//   );
// }

"use client";
import Image from "next/image";
import receipt from "@/public/images/receiptex.jpeg";
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
        {/* <p className="mb-4">
          Your Uploaded Image <BsImage className="inline" />
        </p> */}
        <Image className="w-auto h-[70%]" src={receipt} alt="receipt" />
      </div>

      <div className="bg-gray-300 bg-opacity-20 rounded-lg  h-[70%] w-[50%]">
        <p className="text-[#c6f3f5] text-[2.5rem]  text-bold p-10 ">
          How many people are splitting this receipt?
        </p>
        <div className="text-gray-200 text-3xl flex flex-col space-y-[2rem]">
          <div className=" pl-[5rem] ">
            <p className="mt-1">
              {" "}
              <PiUserCircleFill
                size={45}
                className="inline text-blue-500 mr-4"
              />
              Meesh Af
            </p>
          </div>

          <div className="pl-[5rem] ">
            <p className="mt-1">
              <PiUserCircleFill
                size={45}
                className="inline text-green-500 mr-4"
              />
              Ice Spice Af
            </p>
          </div>
          <div className="pl-[5rem]">
            <p className="mt-1">
              <PiUserCircleFill
                size={45}
                className="inline text-pink-500 mr-4"
              />
              Princess Af
            </p>
          </div>
        </div>

        <div className="pl-[5.5rem] mt-[9rem]">
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
