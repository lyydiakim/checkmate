const worker = Tesseract.createWorker({
    logger: progress => console.log(progress)
  });
  
let workerInitialized = false;  // Flag to track worker initialization

async function performOCR() {
    // some other selections of the file...
    const file = fileInput.files[0];
    const allowedMimeTypes = ["image/jpeg", "image/png"];

    // Check if the file is in the allowed MIME types
    if (file && allowedMimeTypes.includes(file.type)) {
        // Proceed if file is JPEG, PNG, or PDF
    // if file type is good, start parsing image
    }
    else { // file type is not in 'allowedMimeTypes'

        // Alert or log an error if the file is not an allowed type
        if (file) {
            console.error("Error: The file type is not allowed.");
            resultArea.textContent = "Error: Please upload a JPEG or PNG file.";
        } else {
            alert("Please upload a file first!");
        }
    }
}