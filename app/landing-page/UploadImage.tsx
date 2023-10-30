"use client";

import { BsArrowDownCircleFill } from "react-icons/bs";
import React from "react";

import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";

export default function SingleImageDropzoneUsage() {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

  return (
    <div
      className="h-screen max-md:h-full flex flex-row  text-white
    max-md:flex-col
    "
    >
      {/* Left */}
      <div
        className="w-1/2  text-[4.5rem] px-[7rem] pt-[17rem] flex justify justify-center
          max-xl:text-[4rem] max-xl:px-[4.5rem] max-xl:pt-[25%]
          max-lg:px-[3.5rem] max-lg:pt-[30%]
          max-md:text-[3rem] max-md:px-[2rem] max-md:w-[100%] max-md:text-center max-md:pt-[10rem]
        "
      >
        <p>Make receipt splitting fun and efficient!</p>
      </div>

      {/* Right */}
      <div
        className="w-1/2 h-1/5 pt-[25rem] flex-col
        flex justify justify-center
        max-xl:pt-[27rem]
        max-lg:pr-[2rem]
        max-md:pt-[5rem] max-md:w-[100%] max-md:ml-[1rem] max-md:pb-[7rem] max-md:max-h-min
        "
      >
        <p className="flex justify-center text-[1.7rem] max-sm:text-[1.3rem]">
          Upload Your Reciept Image Here
          <BsArrowDownCircleFill
            size={33}
            className="pl-2 mt-1 max-sm:mt-0 inline"
          />
        </p>

        <div className="flex justify justify-center flex-col mt-4">
          <SingleImageDropzone
            width={400}
            height={400}
            value={file}
            onChange={(file) => {
              setFile(file);
            }}
          />
          <button
            onClick={async () => {
              if (file) {
                const res = await edgestore.publicFiles.upload({
                  file,
                  onProgressChange: (progress) => {
                    // you can use this to show a progress bar
                    console.log(progress);
                  },
                });
                // you can run some server action or api here
                // to add the necessary data to your database
                console.log(res);
              }
            }}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
