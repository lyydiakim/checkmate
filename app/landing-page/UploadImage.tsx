"use client";
// import { AiFillCamera } from "react-icons/ai";
// import { BsArrowDownCircleFill } from "react-icons/bs";
// import React from "react";
// import Head from "next/head";

//   return (
//     <div
//       className="h-screen max-md:h-full flex flex-row  text-white
//     max-md:flex-col
//     "
//     >
//       <Head>
//         <link rel="stylesheet" href="ocr.css" />
//         <script
//           defer
//           src="https://cdn.jsdelivr.net/npm/tesseract.js@2.1.4/dist/tesseract.min.js"
//         ></script>
//         <script defer src="ocr.js"></script>
//         <meta charSet="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>OCR with Tesseract.js</title>
//       </Head>

//       {/* Left */}
//       <div
//         className="w-1/2  text-[4.5rem] px-[7rem] pt-[17rem] flex justify justify-center
//           max-xl:text-[4rem] max-xl:px-[4.5rem] max-xl:pt-[25%]
//           max-lg:px-[3.5rem] max-lg:pt-[30%]
//           max-md:text-[3rem] max-md:px-[2rem] max-md:w-[100%] max-md:text-center max-md:pt-[10rem]
//         "
//       >
//         <p>Make receipt splitting fun and efficient!</p>
//       </div>

//       {/* Right */}
//       <div
//         className="w-1/2 h-1/5 pt-[25rem] flex-col
//         flex justify justify-center
//         max-xl:pt-[27rem]
//         max-lg:pr-[2rem]
//         max-md:pt-[5rem] max-md:w-[100%] max-md:ml-[1rem] max-md:pb-[7rem] max-md:max-h-min

//         "
//       >
//         <p className="flex justify-center text-[1.7rem] max-sm:text-[1.3rem]">
//           Upload Your Reciept Image Here
//           <BsArrowDownCircleFill
//             size={33}
//             className="pl-2 mt-1 max-sm:mt-0 inline"
//           />
//         </p>

//         <input
//           type="file"
//           id="upload"
//           className=" mx-[25%] my-2 py-4 pb-11 px-10 rounded-xl border-2
//               transition-all duration-500 bg-gradient-to-br to-[#afdbd74b] via-[#427d784d] from-[#afdbd749] bg-size-200 hover:bg-right-bottom
//             text-white text-xl
//             max-xl:mx-[20%]
//             max-lg:mx-[20%]
//             max-md:mx-[10%] max-md:pb-4
//             "
//         />

//       </div>
//     </div>
//   );
// }

// VERSION WITH TESSERACT
// import React, { useState } from "react";
// import Head from "next/head";
// import Tesseract from "tesseract.js";

// export default function UploadImage() {
//   const [ocrResult, setOcrResult] = useState<string | null>(null);

//   async function performOCR(file: File) {
//     const {
//       data: { text },
//     } = await Tesseract.recognize(file);
//     setOcrResult(text);
//   }

//   function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
//     const file = event.target.files?.[0];
//     if (file) {
//       performOCR(file);
//     }
//   }

//   function formatOcrResult(ocrResult: string | null): JSX.Element | null {
//     if (!ocrResult) {
//       return null;
//     }

//     // Perform custom formatting here based on your OCR response
//     const lines = ocrResult.split("\n");

//     return (
//       <div>
//         <strong>Formatted OCR Result:</strong>
//         <ul>
//           {lines.map((line, index) => (
//             <li key={index}>{line}</li>
//           ))}
//         </ul>
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen max-md:h-full flex flex-row text-white max-md:flex-col">
//       <Head>
//         <link rel="stylesheet" href="ocr.css" />
//         <script
//           defer
//           src="https://cdn.jsdelivr.net/npm/tesseract.js@2.1.4/dist/tesseract.min.js"
//         ></script>
//         <script defer src="ocr.js"></script>
//         <meta charSet="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>OCR with Tesseract.js</title>
//       </Head>

//       {/* Left */}
//       <div className="w-1/2 text-[4.5rem] px-[7rem] pt-[17rem] flex justify justify-center max-xl:text-[4rem] max-xl:px-[4.5rem] max-xl:pt-[25%] max-lg:px-[3.5rem] max-lg:pt-[30%] max-md:text-[3rem] max-md:px-[2rem] max-md:w-[100%] max-md:text-center max-md:pt-[10rem]">
//         <p>Make receipt splitting fun and efficient!</p>
//       </div>

//       {/* Right */}
//       <div className="w-1/2 h-1/5 pt-[25rem] flex-col flex justify justify-center max-xl:pt-[27rem] max-lg:pr-[2rem] max-md:pt-[5rem] max-md:w-[100%] max-md:ml-[1rem] max-md:pb-[7rem] max-md:max-h-min">
//         <p className="flex justify-center text-[1.7rem] max-sm:text-[1.3rem]">
//           Upload Your Receipt Image Here
//         </p>

//         <input
//           type="file"
//           id="upload"
//           className="mx-[25%] my-2 py-4 pb-11 px-10 rounded-xl border-2 transition-all duration-500 bg-gradient-to-br to-[#afdbd74b] via-[#427d784d] from-[#afdbd749] bg-size-200 hover:bg-right-bottom text-white text-xl max-xl:mx-[20%] max-lg:mx-[20%] max-md:mx-[10%] max-md:pb-4"
//           onChange={handleFileUpload}
//         />

//         <button disabled={!ocrResult} onClick={() => console.log(ocrResult)}>
//           Next
//         </button>

//         {formatOcrResult(ocrResult)}
//       </div>
//     </div>
//   );
// }

//THIS VERSION TESSERACT WORKS
// import React, { useState } from "react";
// import Head from "next/head";
// import Tesseract from "tesseract.js";

// export default function UploadImage() {
//   const [ocrResult, setOcrResult] = useState<string | null>(null);

//   async function performOCR(file: File) {
//     const {
//       data: { text },
//     } = await Tesseract.recognize(file);
//     setOcrResult(text);
//   }

//   function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
//     const file = event.target.files?.[0];
//     if (file) {
//       performOCR(file);
//     }
//   }

//   interface ItemsDict {
//     [key: string]: number;
//   }

//   interface ExtrasDict {
//     [key: string]: number;
//   }

//   function formatOcrResult(ocrResult: string | null): JSX.Element | null {
//     if (!ocrResult) {
//       return null;
//     }

//     // Perform custom formatting here based on your OCR response
//     const lines = ocrResult.split("\n");

//     // Use a regular expression to check for lines containing a decimal number
//     const decimalPattern = /\d+\.\d+/;

//     // Filter lines with decimal numbers and not containing "Total" or "Subtotal"
//     const otherLines = lines.filter(
//       (line) =>
//         decimalPattern.test(line) &&
//         !line.toLowerCase().includes("total") &&
//         !line.toLowerCase().includes("subtotal")
//     );

//     // Apply the logic from the provided code
//     const filteredLines = lines.filter((line) => decimalPattern.test(line));
//     let itemsDict: ItemsDict = {};
//     let extrasDict: ExtrasDict = {};
//     let foundTax = false;
//     let foundTotal = false;

//     for (const line of filteredLines) {
//       const match = line.match(decimalPattern);
//       if (match) {
//         const price = parseFloat(match[0]);
//         const itemName = line.replace(match[0], "").trim();

//         if (
//           !line.toLowerCase().includes("card") &&
//           !line.toLowerCase().includes("total") &&
//           !line.toLowerCase().includes("balance") &&
//           !line.toLowerCase().includes("tax") &&
//           !foundTax &&
//           !foundTotal
//         ) {
//           itemsDict[itemName] = price;
//         } else if (line.toLowerCase().includes("tax")) {
//           foundTax = true;
//           itemsDict[itemName] = price;
//         } else {
//           extrasDict[itemName] = price;
//           foundTotal = true;
//         }
//       }
//     }

//     return (
//       <div>
//         {/* <strong>Formatted OCR Result:</strong>
//         <ul>
//           {otherLines.map((line, index) => (
//             <li key={index}>{line}</li>
//           ))}
//         </ul> */}

//         <br />
//         <table>
//           <thead>
//             <tr>
//               <th>Item</th>
//               <th>Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.entries(itemsDict).map(([item, price]) => (
//               <tr key={item}>
//                 <td>{item}</td>
//                 <td>{price}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <table>
//           <thead>
//             <tr>
//               <th>Extra</th>
//               <th>Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.entries(extrasDict).map(([extra, price]) => (
//               <tr key={extra}>
//                 <td>{extra}</td>
//                 <td>{price}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen max-md:h-full flex flex-row text-white max-md:flex-col">
//       <Head>
//         <link rel="stylesheet" href="ocr.css" />
//         <script
//           defer
//           src="https://cdn.jsdelivr.net/npm/tesseract.js@2.1.4/dist/tesseract.min.js"
//         ></script>
//         <script defer src="ocr.js"></script>
//         <meta charSet="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>OCR with Tesseract.js</title>
//       </Head>

//       {/* Left */}
//       <div className="w-1/2 text-[4.5rem] px-[7rem] pt-[17rem] flex justify justify-center max-xl:text-[4rem] max-xl:px-[4.5rem] max-xl:pt-[25%] max-lg:px-[3.5rem] max-lg:pt-[30%] max-md:text-[3rem] max-md:px-[2rem] max-md:w-[100%] max-md:text-center max-md:pt-[10rem]">
//         <p>Make receipt splitting fun and efficient!</p>
//       </div>

//       {/* Right */}
//       <div className="w-1/2 h-1/5 pt-[25rem] flex-col flex justify justify-center max-xl:pt-[27rem] max-lg:pr-[2rem] max-md:pt-[5rem] max-md:w-[100%] max-md:ml-[1rem] max-md:pb-[7rem] max-md:max-h-min">
//         <p className="flex justify-center text-[1.7rem] max-sm:text-[1.3rem]">
//           Upload Your Receipt Image Here
//         </p>

//         <input
//           type="file"
//           id="upload"
//           className="mx-[25%] my-2 py-4 pb-11 px-10 rounded-xl border-2 transition-all duration-500 bg-gradient-to-br to-[#afdbd74b] via-[#427d784d] from-[#afdbd749] bg-size-200 hover:bg-right-bottom text-white text-xl max-xl:mx-[20%] max-lg:mx-[20%] max-md:mx-[10%] max-md:pb-4"
//           onChange={handleFileUpload}
//         />

//         <button disabled={!ocrResult} onClick={() => console.log(ocrResult)}>
//           Next
//         </button>

//         {formatOcrResult(ocrResult)}
//       </div>
//     </div>
//   );
// }

//----------------------------------------------------------------

import { BsArrowDownCircleFill } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Tesseract from "tesseract.js";

export default function UploadImage() {
  const [ocrResult, setOcrResult] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (ocrResult) {
      // Redirect to a new page when ocrResult changes
      sessionStorage.setItem("textKey", "textValue");
      const parsedRecieptText = sessionStorage.getItem("textKey");
      console.log("Stored Value:", parsedRecieptText);

      router.push("/split-page");
    }
  }, [ocrResult, router]);

  async function performOCR(file: File) {
    try {
      const { data } = await Tesseract.recognize(file);
      const ocrResult = data?.text || null;
      setOcrResult(ocrResult);
    } catch (error) {
      console.error("Error performing OCR:", error);
    }
  }

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      // performOCR(file); // add later testing image functionality rn
      const fileUrl = URL.createObjectURL(file);
      setFileUrl(fileUrl);

      sessionStorage.setItem("fileUrl", fileUrl);
      router.push("/split-page");
    }
  }

  function formatOcrResult(ocrResult: string | null): JSX.Element | null {
    return (
      <div>
        {ocrResult && (
          <div>
            <p>Parsed Receipt</p>
            <br />
            <ul>
              {ocrResult.split("\n").map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-screen max-md:h-full flex flex-row text-white max-md:flex-col">
      <Head>
        <link rel="stylesheet" href="ocr.css" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>OCR with Tesseract.js</title>
      </Head>

      <div className="w-1/2 text-[4.5rem] px-[7rem] pt-[17rem] flex justify justify-center max-xl:text-[4rem] max-xl:px-[4.5rem] max-xl:pt-[25%] max-lg:px-[3.5rem] max-lg:pt-[30%] max-md:text-[3rem] max-md:px-[2rem] max-md:w-[100%] max-md:text-center max-md:pt-[10rem]">
        <p>Make receipt splitting fun and efficient!</p>
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
          onChange={handleFileUpload}
        />
        {/* 
        <table id="result" cellSpacing="0" cellPadding="0"></table>
        <table id="extras" cellSpacing="0" cellPadding="0"></table> */}

        {/* {formatOcrResult(ocrResult)} */}
      </div>
    </div>
  );
}
