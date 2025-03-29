//backend/config/awsConfig.js
require("dotenv").config();
const AWS = require("aws-sdk");

// Debugging: Check if env variables are loaded
console.log("AWS Access Key:", process.env.AWS_ACCESS_KEY_ID ? "Loaded ✅" : "Missing ❌");
console.log("AWS Secret Key:", process.env.AWS_SECRET_ACCESS_KEY ? "Loaded ✅" : "Missing ❌");
console.log("AWS Region:", process.env.AWS_REGION ? process.env.AWS_REGION : "Missing ❌");

// AWS S3 Configuration
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});


console.log("✅ AWS S3 Bucket:", process.env.AWS_S3_BUCKET || "❌ Missing!");

module.exports = s3;
