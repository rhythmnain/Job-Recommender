//backend/models/job.model.js
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    description: String,
    skillsRequired: [String],
    location: String,
    salary: Number,
    experienceLevel: String
});

module.exports = mongoose.model("Job", jobSchema);
