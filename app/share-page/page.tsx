"use client";
// app/share-page/page.tsx
import html2pdf from 'html2pdf.js';
import { useState, useEffect } from 'react';

const SharePage: React.FC = () => {
  const [parsedReceipt, setParsedReceipt] = useState<string[]>([]);
  const [linesByNames, setLinesByNames] = useState<{ [key: string]: string[] }>({});

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

  const handleExportPDF = () => {
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

      // Generate PDF from the combined content
      html2pdf().from(pdfContent).set(pdfOptions).save();
    }
  };

  return (
    <div className="text-white m-10 mt-[6rem]">
      <h1 className="text-[2.5rem] flex justify-center">
        Splitters & Items
      </h1>

      {/* Parsed receipt content */}
      <div id="parsedReceipt" className="text-gray-200 mt-4">
        {parsedReceipt.map((line, index) => (
          <p key={index} className="text-[1rem] mb-[1rem]">
            {line}
          </p>
        ))}
      </div>

      {/* Lines by names content */}
      {Object.keys(linesByNames).map((name, index) => (
        <div key={index} className="text-gray-200 mt-4">
          <h2>{name}'s Items:</h2>
          <ul>
            {linesByNames[name].map((line, lineIndex) => (
              <li key={lineIndex}>{line}</li>
            ))}
          </ul>
        </div>
      ))}

      {/* Export button */}
      <div className="mt-4">
        <button
          onClick={handleExportPDF}
          className="bg-[#289ba158] border-2 border-[#9acbce] border-solid hover:bg-[#289ba11e] hover:animate-pulse text-2xl p-2 rounded-md"
        >
          Export as PDF
        </button>
      </div>
      <div className="text-[2rem] flex justify-center">
        <p>Would you like to save this as a PDF to send to your Checkmates?</p>
      </div>
    </div>
  );
}

export default SharePage;
