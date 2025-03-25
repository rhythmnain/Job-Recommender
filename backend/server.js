//backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const s3 = require("./config/awsConfig");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Test AWS S3 Connection
s3.listBuckets((err, data) => {
  if (err) {
    console.error("❌ AWS S3 Connection Error:", err);
  } else {
    console.log("✅ AWS S3 Buckets:", data.Buckets);
  }
});

const PORT = process.env.PORT || 5000;

// Routes
app.get("/", (req, res) => {
  res.send("Job Recommendation System API is running...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
