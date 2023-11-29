"use client";
// app/share-page/page.tsx
// import html2pdf from 'html2pdf.js';
import { useState, useEffect } from 'react';
import 'global';
let html2pdfModule: Promise<{ default: any }> | undefined;
import { CopyToClipboard } from 'react-copy-to-clipboard'; // Import the CopyToClipboard component

if (typeof window !== 'undefined') {
  // Dynamically import html2pdf.js only on the client side
  html2pdfModule = import('html2pdf.js');
}

const SharePage: React.FC = () => {
  const [parsedReceipt, setParsedReceipt] = useState<string[]>([]);
  const [linesByNames, setLinesByNames] = useState<{ [key: string]: string[] }>({});
  const [copied, setCopied] = useState(false); // State to track whether text is copied

  useEffect(() => {
    // Retrieve parsed receipt from sessionStorage
    const storedParsedReceipt = sessionStorage.getItem('parsedReceipt');

    if (storedParsedReceipt) {
      const parsedReceiptData = JSON.parse(storedParsedReceipt);
      setParsedReceipt(parsedReceiptData);
    }

    // Retrieve lines by names from sessionStorage
    const storedLinesByNames = sessionStorage.getItem('linesByNames');

    if (storedLinesByNames) {
      const linesByNamesData = JSON.parse(storedLinesByNames);
      setLinesByNames(linesByNamesData);
    }
  }, []);

  const handleExportPDF = async () => {
    const content = document.getElementById('parsedReceipt');

    if (content) {
      const pdfOptions = {
        margin: 10,
        filename: 'parsed_receipt.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      // Create a div to hold the PDF content
      const pdfContent = document.createElement('div');

      // Add parsed receipt content
      parsedReceipt.forEach((line, index) => {
        const pElement = document.createElement('p');
        pElement.textContent = line;
        pdfContent.appendChild(pElement);
      });

      // Add lines by names content
      Object.keys(linesByNames).forEach((name) => {
        const h2Element = document.createElement('h2');
        h2Element.textContent = `${name}'s Items:`;
        pdfContent.appendChild(h2Element);

        const ulElement = document.createElement('ul');
        linesByNames[name].forEach((line, lineIndex) => {
          const liElement = document.createElement('li');
          liElement.textContent = line;
          ulElement.appendChild(liElement);
        });
        pdfContent.appendChild(ulElement);
      });

      // Ensure html2pdfModule is defined
    if (html2pdfModule) {
      try {
        const html2pdf = (await html2pdfModule).default;

        if (html2pdf) {
          html2pdf().from(pdfContent).set(pdfOptions).save();
        } else {
          console.error('html2pdf.js is not available');
        }
      } catch (error) {
        console.error('Failed to load html2pdf.js', error);
      }
    }
    }
  };

  // Function to handle copying lists
  const handleCopyLists = () => {
  // Create an array to store the lines with names
  const linesWithNames = [];

  // Add the parsed receipt lines
  linesWithNames.push(...parsedReceipt);

  // Add lines by names with their corresponding names and a blank line between each set
  Object.keys(linesByNames).forEach((name, index, array) => {
    const nameHeader = `${name}'s Items:`;
    linesWithNames.push(nameHeader, ...linesByNames[name]);

    // Add a blank line unless it's the last set of lines
    if (index < array.length - 1) {
      linesWithNames.push('');
    }
  });

  // Concatenate the lines into a single string
  const listsText = linesWithNames.join('\n');

  // Use the clipboard API to copy the text
  navigator.clipboard.writeText(listsText)
    .then(() => setCopied(true))
    .catch((error) => console.error('Copy failed:', error));
  };

  return (
    <div className="text-white m-10 mt-[6rem]">
      <h1 className="text-[1.5rem] flex justify-center">
        Here's your receipt information based on your selection.
      </h1>

      {/* Parsed receipt content */}
      <div id="parsedReceipt" className="text-gray-200 mt-4 flex justify-center">
        {parsedReceipt.map((line, index) => (
          <p key={index} className="text-[1rem] mb-[1rem]">
            {line}
          </p>
        ))}
      </div>
      
      {/* Lines by names content */}
      {Object.keys(linesByNames).map((name, index) => (
        <div key={index} className="text-gray-200 mt-4 flex flex-col items-center">
          <div className="text-teal text-left w-full max-w-md text-center">
            <h2 className="text-gray-200 font-bold" style={{ whiteSpace: 'pre-wrap' }}>{name}'s Items: </h2>
            <ul>
              {linesByNames[name].map((line, lineIndex) => (
                <li key={lineIndex}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <br></br>
      <div className="text-[1rem] flex justify-center">
        <p>How would you like share this with your checkmates?</p>
      </div>
      
      
      {/* Buttons container */}
      <div className="mt-4 flex justify-center space-x-4">
        {/* Export as PDF button */}
        <button
          onClick={handleExportPDF}
          className="bg-[#289ba158] border-2 border-[#9acbce] border-solid hover:bg-[#289ba11e] hover:animate-pulse text-2xl p-2 rounded-md"
        >
          Export as PDF
        </button>

      {/* Copy Lists button */}
      <CopyToClipboard text={parsedReceipt.concat(Object.values(linesByNames).flat()).join('\n')}>
        <button
          onClick={handleCopyLists}
          className="bg-[#289ba158] border-2 border-[#9acbce] border-solid hover:bg-[#d04d0a] hover:animate-pulse text-2xl p-2 rounded-md"
        >
          Copy Lists
        </button>
        </CopyToClipboard>
          {copied && <p className="text-green-500">Lists copied to clipboard!</p>}
      </div>

      
    </div>
  );
}

export default SharePage;