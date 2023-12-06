"use client";

import { useRouter } from "next/navigation";
import { BsArrowDownCircleFill } from "react-icons/bs";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function UploadImage() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const router = useRouter();

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      //if file uploaded is valid
      const fileUrl = URL.createObjectURL(file); //create url to address the image
      setFileUrl(fileUrl);

      sessionStorage.setItem("fileUrl", fileUrl); //save img to session storage to use on next pages

      router.push("/ocr-page"); //redirect to split page once image is uploaded & image url created
    }
  }

  return (
    <div className="h-screen max-md:h-full flex flex-row text-white max-md:flex-col">
      <Head>
        <link rel="stylesheet" href="ocr.css" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>OCR with Tesseract.js</title>
      </Head>

      <div className="w-1/2 px-[7rem] pt-[17rem] flex-col flex max-xl:px-[4.5rem] max-xl:pt-[25%] max-lg:px-[3.5rem] max-lg:pt-[30%] max-md:px-[2rem] max-md:w-[100%] max-md:text-center max-md:pt-[10rem]">
        <p className="pt-0 text-[4.5rem] max-xl:text-[4rem] max-md:text-[3rem]">Make receipt splitting fun and efficient!</p>
        <p className="pt-[2rem] text-3xl max-xl:text-2xl max-md:pt-[1.5rem] max-md:text-xl">Never used CheckMate before? Check out <Link 
          href="../how-to" className="underline underline-offset-4 hover:text-[#99f6e4]">our tutorial!</Link></p>
      </div>

      <div className="w-1/2 h-1/5 pt-[25rem] flex-col flex justify justify-center max-xl:pt-[27rem] max-lg:pr-[2rem] max-md:pt-[5rem] max-md:w-[100%] max-md:ml-[1rem] max-md:pb-[7rem] max-md:max-h-min">
        <p className="flex justify-center text-[1.7rem] max-sm:text-[1.3rem]">
          Upload Your Receipt Image Here
          <BsArrowDownCircleFill
            size={33}
            className="pl-2 mt-1 max-sm:mt-0 inline"
          />
        </p>

        <input
          type="file"
          id="upload"
          className="mx-[25%] my-2 py-4 pb-11 px-10 rounded-xl border-2
          transition-all duration-500 bg-gradient-to-br to-[#afdbd74b] via-[#427d784d] from-[#afdbd749] bg-size-200 hover:bg-right-bottom
        text-white text-xl
          max-xl:mx-[20%]
          max-lg:mx-[20%]
          max-md:mx-[10%] max-md:pb-4
          "
          onChange={handleFileUpload} //if some file is uploaded by user, then call handleFileUpload function
        />
      </div>
    </div>
  );
}
