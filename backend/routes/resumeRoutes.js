//backend/routes/resumeRoutes.js

const express = require("express");
const multer = require("multer");
// const { uploadResume } = require("../controllers/resumeController");
// const { processResume } = require("../controllers/resumeController");
const { uploadResume, processResume } = require("../controllers/resumeController");

const router = express.Router();

// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Resume upload route
router.post("/upload", upload.single("resume"), uploadResume);

// Resume Processing Route (Extract Skills)
router.post("/process", upload.single("resume"), processResume);

module.exports = router;
