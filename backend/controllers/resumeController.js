//backend/controllers/resumeController.js
const AWS = require("aws-sdk");
const s3 = require("../config/awsConfig");
const { extractSkillsFromResume, extractTextFromPDF } = require("../services/resumeParser");

exports.uploadResume = async (req, res) => {
  try {
    // Debugging: Check if AWS_S3_BUCKET is loaded
    console.log("🔍 AWS_S3_BUCKET:", process.env.AWS_S3_BUCKET);

    if (!process.env.AWS_S3_BUCKET) {
      throw new Error("AWS S3 Bucket is missing in environment variables");
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileBuffer = req.file.buffer;
    const fileName = `${Date.now()}_${req.file.originalname}`;

    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET, // ✅ This should now have a value
      Key: `resumes/${fileName}`,
      Body: fileBuffer,
      ContentType: req.file.mimetype,
    };

    const data = await s3.upload(uploadParams).promise();

    res.status(200).json({
      message: "Resume uploaded successfully",
      resumeUrl: data.Location,
    });
  } catch (error) {
    console.error("❌ Resume Upload Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Processes and extracts skills from resume
 */
exports.processResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileBuffer = req.file.buffer;

    // Extract text from PDF
    const resumeText = await extractTextFromPDF(fileBuffer);
    if (!resumeText) {
      return res.status(500).json({ message: "Failed to extract text from resume" });
    }

    // Extract skills from resume
    const skills = await extractSkillsFromResume(fileBuffer); // ✅ Corrected function call

    res.status(200).json({
      message: "Resume processed successfully",
      extractedSkills: skills,
    });

  } catch (error) {
    console.error("❌ Resume Processing Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
