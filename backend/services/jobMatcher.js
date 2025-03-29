// backend/services/jobMatcher.js

/**
 * Matches extracted skills from a resume with available job postings
 * @param {Array} extractedSkills - Skills parsed from the resume
 * @param {Array} jobList - List of jobs from the database
 * @returns {Array} Sorted list of jobs based on match score
 */
function matchJobs(extractedSkills, jobList) {
    return jobList
        .map(job => {
            // Find how many skills match
            const matchedSkills = job.skillsRequired.filter(skill => extractedSkills.includes(skill));

            return {
                ...job.toObject(),  // Convert Mongoose document to plain object
                matchScore: matchedSkills.length / job.skillsRequired.length
            };
        })
        .sort((a, b) => b.matchScore - a.matchScore); // Sort in descending order of match score
}

module.exports = { matchJobs };
