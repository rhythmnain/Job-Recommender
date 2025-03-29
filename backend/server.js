//backend/server.js
require("dotenv").config();
console.log("✅ JWT Secret Key:", process.env.JWT_SECRET ? "Loaded" : "Not Found");
console.log("✅ Loaded ENV Variables");
process.env.AWS_S3_BUCKET = "rhy-job-recommender";
console.log("🔍 AWS_S3_BUCKET:", process.env.AWS_S3_BUCKET);

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const s3 = require("./config/awsConfig");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");


const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/resume", resumeRoutes);
app.use("/api/auth", authRoutes);

s3.config.getCredentials((err) => {
  if (err) {
    console.error("❌ AWS S3 Connection Error:", err);
  } else {
    console.log("✅ AWS S3 Credentials Loaded");
    s3.listBuckets((err, data) => {
      if (err) {
        console.error("❌ AWS S3 List Buckets Error:", err);
      } else {
        console.log("✅ AWS S3 Buckets:", data.Buckets);
      }
    });
  }
});

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Job Recommendation System API is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
