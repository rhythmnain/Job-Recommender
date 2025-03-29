//backend/services/resumeParser.js
const pdfParse = require("pdf-parse");
const natural = require("natural");
const skillsList = require("../utils/skillsList");

// Extract text from PDF
async function extractTextFromPDF(pdfBuffer) {
  try {
    return (await pdfParse(pdfBuffer)).text.toLowerCase();
  } catch (error) {
    console.error("❌ Error extracting text:", error);
    return "";
  }
}

// Extract skills from resume text
async function extractSkillsFromResume(pdfBuffer) {
  try {
    const pdfText = await extractTextFromPDF(pdfBuffer);
    console.log("✅ Extracted Text:", pdfText); // Debugging

    // Tokenization
    const tokenizer = new natural.WordTokenizer();
    const words = tokenizer.tokenize(pdfText);

    // Find matching skills
    const matchedSkills = skillsList.filter((skill) =>
      words.includes(skill.toLowerCase())
    );

    return matchedSkills;
  } catch (error) {
    console.error("❌ Error extracting skills:", error);
    return [];
  }
}

// ✅ Correct Export
module.exports = { extractTextFromPDF, extractSkillsFromResume };
