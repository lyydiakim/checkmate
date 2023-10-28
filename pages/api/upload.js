"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = require("multer");
var path_1 = require("path");
var app = (0, express_1.default)();
var port = 3000;
// Set up the storage engine and file filter for Multer
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads"); // Destination directory for uploaded files
    },
    filename: function (req, file, cb) {
        var extname = path_1.default.extname(file.originalname);
        cb(null, Date.now() + extname); // Unique filename
    },
});
var upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: function (req, file, cb) {
        if (file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/gif") {
            cb(null, true);
        }
        else {
            cb(new Error("Invalid file type"));
        }
    },
});
// Serve static files from the 'uploads' directory
app.use("/uploads", express_1.default.static("uploads"));
// Route for uploading a single file
app.post("/upload", upload.single("file"), function (req, res) {
    if (!req.file) {
        return res.status(400).json({ error: "No file provided" });
    }
    res.json({
        message: "File uploaded successfully",
        filename: req.file.filename,
    });
});
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
