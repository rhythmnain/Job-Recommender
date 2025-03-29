#ML-model/preprocess.py
import PyPDF2
import spacy
import nltk
from nltk.corpus import stopwords
import string
import re

# Download required NLTK datasets
nltk.download("stopwords")

# Load SpaCy English Model
nlp = spacy.load("en_core_web_sm")

# Load a predefined skills list (can be expanded)
SKILLS_DB = [
    "Python", "Java", "C++", "JavaScript", "SQL", "TensorFlow", "Docker", "Selenium",
    "Machine Learning", "Data Science", "Git", "AWS", "RESTful API", "Kubernetes", "Jira"
]

def extract_text_from_pdf(pdf_path):
    """Extracts raw text from a PDF file."""
    text = ""
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            text += page.extract_text() + "\n"
    return text.strip()

def clean_text(text):
    """Removes punctuation, stopwords, and extra spaces from text."""
    text = text.lower()  # Convert to lowercase
    text = re.sub(r"\s+", " ", text)  # Remove extra spaces
    text = text.translate(str.maketrans("", "", string.punctuation))  # Remove punctuation
    
    stop_words = set(stopwords.words("english"))
    words = text.split()
    words = [word for word in words if word not in stop_words]  # Remove stopwords
    
    return " ".join(words)

def extract_skills(text):
    """Extracts skills from cleaned resume text."""
    doc = nlp(text)
    extracted_skills = set()

    for token in doc:
        if token.text in SKILLS_DB:  # Match against predefined skills database
            extracted_skills.add(token.text)

    return list(extracted_skills)

def process_resume(pdf_path):
    """Complete pipeline to process a resume and extract skills."""
    raw_text = extract_text_from_pdf(pdf_path)
    cleaned_text = clean_text(raw_text)
    skills = extract_skills(cleaned_text)
    
    return skills

if __name__ == "__main__":
    pdf_path = "sample_resume.pdf"  # Test file
    skills = process_resume(pdf_path)
    print("Extracted Skills:", skills)
    

