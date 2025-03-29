//backend/services/s3Service.js
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config();

//aws configuration
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

//multer upload middleware
const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: "public-read", //allows access publicly
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            const fileName = `resumes/${Date.now()}_${file.originalname}`;
            cb(null, fileName);
        },
    }),
    limits:  { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB

});

module.exports = upload;