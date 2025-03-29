//backend/routes/jobRoutes.js
const express = require("express");
const { getJobs, recommendJobs, createJob } = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// 🔹 Fetch all jobs
router.get("/", getJobs);

// 🔹 Get recommended jobs based on skills
router.get("/recommend", protect, recommendJobs);

// 🔹 Create a new job posting (Protected - Admin only)
router.post("/", protect, createJob);

module.exports = router;

