# Job Recommender - Machine Learning Model

## 📌 Project Overview
The **Job Recommender ML Model** is a machine learning-based web application that helps freshers and new graduates find suitable job recommendations based on their resumes. The system extracts skills from uploaded resumes and matches them with relevant job listings.


## 🚀 Features
- Extracts text from PDF resumes.
- Cleans and preprocesses resume text.
- Identifies relevant skills using **SpaCy** and **NLTK**.
- Matches extracted skills against a predefined database of skills.
- Can be integrated into a larger job-matching system.



## 📂 Project Structure
```
job-recommender/
│── backend/
│   ├── config/                 # Configuration files
│   │   ├── db.js               # MongoDB connection setup
│   │   ├── awsConfig.js        # AWS S3 setup
│   ├── controllers/            # API controllers (handling requests)
│   │   ├── authController.js   # User authentication (Signup/Login)
│   │   ├── resumeController.js # Upload resume, extract skills
│   │   ├── jobController.js    # Fetch job recommendations
│   ├── models/                 # MongoDB Models (Schemas)
│   │   ├── user.model.js       # User schema (name, email, password)
│   │   ├── resume.model.js     # Resume schema (userId, fileUrl, skills)
│   │   ├── job.model.js        # Job schema (title, company, requiredSkills)
│   ├── routes/                 # API routes
│   │   ├── authRoutes.js       # Routes for authentication
│   │   ├── resumeRoutes.js     # Routes for resume upload & processing
│   │   ├── jobRoutes.js        # Routes for job recommendations
│   ├── services/               # Business logic (ML, AWS)
│   │   ├── skillExtractor.js   # Extract skills from resume (NLP)
│   │   ├── jobMatcher.js       # Match skills to jobs
│   │   ├── s3Service.js        # AWS S3 file upload logic
│   ├── middleware/             # Middleware functions
│   │   ├── authMiddleware.js   # JWT authentication middleware
│   │   ├── errorHandler.js     # Error handling middleware
│   ├── utils/                  # Helper functions
│   │   ├── responseHelper.js   # Standardize API responses
│   │   ├── skillsList.js       # skill set file
│   ├── server.js               # Main Express server file
│   ├── package.json            # Backend dependencies
│   ├── .env                    # Environment variables (DB URI, AWS keys)
│
│── frontend/ (for future developemnt)         # Frontend (React/Next.js)
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── UploadForm.js    # Form for uploading resumes
│   │   │   ├── JobList.js       # List of recommended jobs
│   │   ├── pages/               # Main pages
│   │   │   ├── Home.js          # Landing page
│   │   │   ├── Upload.js        # Resume upload page
│   │   │   ├── Recommendations.js # Job recommendations page
│   │   ├── services/            # API calls
│   │   │   ├── authService.js   # Handles authentication API requests
│   │   │   ├── resumeService.js # Handles resume upload API requests
│   │   │   ├── jobService.js    # Fetches recommended jobs
│   │   ├── App.js               # Main React component
│   │   ├── index.js             # Entry point
│   ├── package.json             # Frontend dependencies
│
│── ML-model/                    # Machine Learning for skill extraction
│   ├── model.py                 # NLP model to extract skills
│   ├── preprocess.py            # Preprocessing of resumes
│   ├── requirements.txt         # Python dependencies
│   ├── sample_resume.pdf        # sample resume file
│
│── README.md                     # Project documentation
│── .gitignore                     # Ignore unnecessary files
│── .env                           # Environment variables (DB URI, AWS keys)


```

## 🛠️ Installation & Setup
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/job-recommender-ml.git
cd job-recommender-ml/ML-model
```

### 2️⃣ Create a Virtual Environment (Optional but Recommended)
```bash
python -m venv venv
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate    # On Windows
```

### 3️⃣ Install Dependencies
```bash
pip install -r requirements.txt
python -m spacy download en_core_web_sm
```

## 📜 How to Run
1. Place a resume PDF inside the `ML-model/` directory (e.g., `sample_resume.pdf`).
2. Run the model:
```bash
python model.py
```
3. Extracted skills will be printed on the console.

## 🏗️ Technologies Used

**Backend:**

**Node.js** (Express.js for API handling)

**MongoDB **(Database for user and job data)

**JWT** (Authentication middleware)

**AWS S3** (For storing resumes)


**Machine Learning:**


**Python** (For NLP and skill extraction)

**SpaCy & NLTK** (Text preprocessing & entity recognition)

**PyPDF2** (PDF text extraction)



## 🎯 Future Enhancements

-🌐 Frontend Development (React/Next.js): A user-friendly interface for seamless interaction.

-🤝 User Profiles & Dashboard: Enhanced user experience with saved jobs & insights.

-🔍 Advanced Job Matching Algorithm: Improve accuracy using ML & deep learning.



**Usage**


Run the backend server.

Process resumes using model.py.

Call the API to fetch job recommendations.



## 🤝 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.


## 📬 Contact
For any queries, reach out via [rhythmnainkour@gmail.com](mailto:rhythmnainkour@gmail.com.com) or open an issue in this repository.

