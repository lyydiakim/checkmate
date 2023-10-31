const worker = Tesseract.createWorker({
    logger: progress => console.log(progress)
  });
  
  let workerInitialized = false;  // Flag to track worker initialization
  
  async function performOCR() {
      const fileInput = document.getElementById('upload');
      const file = fileInput.files[0];
      const resultArea = document.getElementById('result');
  
      const allowedMimeTypes = ["image/jpeg", "image/png"];
  
      // Check if the file is in the allowed MIME types
      if (file && allowedMimeTypes.includes(file.type)) {
          // Proceed if file is JPEG, PNG
  
          // Load Tesseract worker if it's not already initialized
          if (!workerInitialized) {
              await worker.load();
              await worker.loadLanguage('eng');
              await worker.initialize('eng');
              workerInitialized = true;
          }
  
          // Convert file to data URL to pass to Tesseract
          const reader = new FileReader();
  
          reader.onload = async function (event) {
              try {
                  const { data: { text } } = await worker.recognize(event.target.result);
                  resultArea.textContent = text;
              } catch (error) {
                  console.error("Error details:", error);
                  resultArea.textContent = "Error processing the file!";
              }
          };
  
          reader.readAsDataURL(file);
      } else {
          // Alert or log an error if the file is not an allowed type
          if (file) {
              console.error("Error: The file type is not allowed.");
              resultArea.textContent = "Error: Please upload a JPEG or PNG file.";
          } else {
              alert("Please upload a file first!");
          }
      }
  }