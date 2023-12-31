
from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 
# Load the trained SVM classifier and vectorizer
svm_classifier = joblib.load('model.pkl')
v = joblib.load('vectorizer.pkl')

# Define the list of emotion labels
emotions = ['neutral', 'joy', 'sadness', 'fear', 'surprise', 'anger', 'shame', 'disgust']

def predict_emotion(text):
    # Process the input text
    texts = [text]
    text_count = v.transform(texts)
    
    # Make predictions using the SVM classifier
    result = svm_classifier.predict(text_count)
    
    # Map the result to the corresponding emotion label
    predicted_emotion = emotions[result[0] - 1]
    
    return predicted_emotion

@app.route('/prediction', methods=['POST'])
def predict():
    try:
        # Get input data from the request
        data = request.json
        text = data['text']
        
        # Call the predict_emotion function
        predicted_emotion = predict_emotion(text)

        # Return the predicted emotion as a JSON response
        response = {'predicted_emotion': predicted_emotion}
        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=8080) 

