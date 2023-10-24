import { Amplify, Storage} from 'aws-amplify'; // Correct import
import awsconfig from 'aws-exports'; // Import your Amplify configuration

Amplify.configure(awsconfig); // Configure Amplify with your configuration

const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const uploadResult = document.getElementById('uploadResult');

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const file = fileInput.files[0];

    try {
        if (file) {
            // Generate a unique key for the S3 object (file) based on the current timestamp
            const key = `${Date.now()}_${file.name}`;

            // Upload the file to the S3 bucket
            await Storage.put(key, file, {
                contentType: file.type, // Set the content type (e.g., image/jpeg)
            });

            uploadResult.textContent = `File successfully uploaded to S3: ${key}`;
        } else {
            uploadResult.textContent = 'Please select a file to upload.';
        }
    } catch (error) {
        uploadResult.textContent = `Upload error: ${error.message}`;
    }
});