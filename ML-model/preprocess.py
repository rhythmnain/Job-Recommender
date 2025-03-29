#ML-model/preprocess.py
import PyPDF2
import re
import nltk
import spacy
from nltk.corpus import stopwords

# Download stopwords if not present
nltk.download('stopwords')
stop_words = set(stopwords.words('english'))

# Load Spacy NLP Model
nlp = spacy.load("en_core_web_sm")

def extract_text_from_pdf(pdf_path):
    """Extracts raw text from a PDF file."""
    text = ""
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            text += page.extract_text() + " "
    return text.strip()

def clean_text(text):
    """Cleans and tokenizes resume text."""
    text = text.lower()  # Convert to lowercase
    text = re.sub(r'\s+', ' ', text)  # Remove extra spaces
    text = re.sub(r'[^a-zA-Z\s]', '', text)  # Remove special characters & numbers

    tokens = text.split()
    tokens = [word for word in tokens if word not in stop_words]  # Remove stopwords

    return " ".join(tokens)

def preprocess_resume(pdf_path):
    """Preprocesses resume and returns cleaned text."""
    raw_text = extract_text_from_pdf(pdf_path)
    return clean_text(raw_text)

# Example usage
if __name__ == "__main__":
    pdf_file = "sample_resume.pdf"  # Replace with actual resume file
    processed_text = preprocess_resume(pdf_file)
    print("Processed Resume Text:", processed_text)
