"use client";
import html2pdf from 'html2pdf.js';
import { useState, useEffect } from 'react';
import { ChevronRightCircle } from 'lucide-react';
import Image from 'next/image';

interface SharePageProps {
  selectedLines: string[];
}

const SharePage: React.FC<SharePageProps> = ({ selectedLines }) => {
  const [parsedReceipt, setParsedReceipt] = useState<string[]>([]);

  useEffect(() => {
    // Retrieve parsed receipt from sessionStorage 
    const storedParsedReceipt = sessionStorage.getItem('parsedReceipt');

    if (storedParsedReceipt) {
      const parsedReceiptData = JSON.parse(storedParsedReceipt);
      setParsedReceipt(parsedReceiptData);
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

      html2pdf().from(content).set(pdfOptions).save();
    }
  };

  return (
    <div className="text-white m-10 mt-[6rem]">
      <h1 className="text-[2.5rem] flex justify-center">
        Receipt Details
      </h1>

      {/* Parsed receipt content */}
      <div id="parsedReceipt" className="text-gray-200 mt-4">
        {parsedReceipt.map((line, index) => (
          <p key={index} className="text-[1rem] mb-[1rem]">
            {line}
          </p>
        ))}
      </div>

      {/* Selected lines content */}
      <div id="selectedLines" className="text-gray-200 mt-4">
        <h2>Selected Lines:</h2>
        <ul>
          {selectedLines && selectedLines.length > 0 ? (
            selectedLines.map((line, index) => (
              <li key={index}>{line}</li>
            ))
          ) : (
            <p>No selected lines</p>
          )}
        </ul>
      </div>

      <br></br>

      {/* Export button */}
      <div className="mt-4">
        <br></br>
        <button
          onClick={handleExportPDF}
          className="bg-[#289ba158] border-2 border-[#9acbce] border-solid hover:bg-[#289ba11e] hover:animate-pulse text-2xl p-2 rounded-md"
        >
          Export as PDF
        </button>
      </div>
    </div>
  );
};

export default SharePage;
