from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import os

app = Flask(__name__)
CORS(app)  # Allow frontend to communicate with backend

# Paths to the model and vectorizer
model_path = 'fake_news_model.pkl'
vectorizer_path = r'C:\Users\Anushka\Desktop\project2\tfidf_vectorizer.pkl'

# Function to load the model and vectorizer
def load_model_and_vectorizer():
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found at {model_path}")
    if not os.path.exists(vectorizer_path):
        raise FileNotFoundError(f"Vectorizer file not found at {vectorizer_path}")
    
    with open(model_path, 'rb') as model_file:
        model = pickle.load(model_file)

    with open(vectorizer_path, 'rb') as vectorizer_file:
        vectorizer = pickle.load(vectorizer_file)

    return model, vectorizer

# Load the model and vectorizer
try:
    model, vectorizer = load_model_and_vectorizer()
    print("Model and vectorizer loaded successfully.")
except FileNotFoundError as e:
    print(f"Error: {e}")
    model, vectorizer = None, None  # Set to None to avoid further errors

@app.route('/predict', methods=['POST'])
def predict():
    if model is None or vectorizer is None:
        return jsonify({"error": "Model or vectorizer could not be loaded."}), 500

    data = request.get_json()
    news_text = data.get('news_text', '')

    if not news_text.strip():
        return jsonify({"error": "No text provided"}), 400

    # Vectorize the input text
    try:
        text_vectorized = vectorizer.transform([news_text])
    except Exception as e:
        return jsonify({"error": f"Error while vectorizing text: {e}"}), 500

    # Predict using the trained model
    try:
        prediction = model.predict(text_vectorized)[0]
        confidence_score = max(model.predict_proba(text_vectorized)[0]) * 100  # Confidence in percentage
    except Exception as e:
        return jsonify({"error": f"Error during prediction: {e}"}), 500

    result = "Fake" if prediction == 1 else "Real"

    return jsonify({"prediction": result, "confidence": confidence_score})

if __name__ == "__main__":
    app.run(debug=True)
