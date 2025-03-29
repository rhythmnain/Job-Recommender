// backend/controllers/jobController.js
const Job = require("../models/job.model");
const { matchJobs } = require("../services/jobMatcher");

/**
 * Fetches all job postings
 */
const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        console.error("❌ Error fetching jobs:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * Creates a new job posting (Admin only)
 */
const createJob = async (req, res) => {
    try {
        const { title, company, location, skillsRequired, description } = req.body;

        if (!title || !company || !skillsRequired || skillsRequired.length === 0) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const job = new Job({ title, company, location, skillsRequired, description });
        await job.save();

        res.status(201).json({ message: "Job created successfully", job });
    } catch (error) {
        console.error("❌ Error creating job:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * Matches jobs based on extracted resume skills
 */
const matchJobsWithResume = async (req, res) => {
    try {
        const { extractedSkills } = req.body;  // Extracted skills should be passed in request body

        if (!extractedSkills || extractedSkills.length === 0) {
            return res.status(400).json({ message: "No skills provided for matching" });
        }

        const jobs = await Job.find();  // Fetch all jobs
        const matchedJobs = matchJobs(extractedSkills, jobs);  // Match jobs based on skills

        res.status(200).json({ message: "Job matching successful", matchedJobs });
    } catch (error) {
        console.error("❌ Error matching jobs:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getJobs, createJob, matchJobsWithResume };
