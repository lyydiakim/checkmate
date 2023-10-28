import express from "express";
import multer from "multer";
import path from "path";

import { Request, Response } from "express";

const app = express();
const port = 3000;

// Set up the storage engine and file filter for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, Date.now() + extname); // Unique filename
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static("uploads"));

// Route for uploading a single file
app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file provided" });
  }

  res.json({
    message: "File uploaded successfully",
    filename: req.file.filename,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
