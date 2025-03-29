//backend/models/resume.model.js
const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    extractedSkills: [String],
    uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Resume", resumeSchema);
