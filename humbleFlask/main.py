from flask import Flask, request, jsonify
import os
import io
from google.cloud import vision
from sentence_transformers import SentenceTransformer
from sentence_transformers.util import cos_sim
from collections import defaultdict
import heapq

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file:
        # Save the file temporarily
        temp_path = os.path.join('/tmp', file.filename)
        file.save(temp_path)

        # Process the image
        category_confidence = detect_text(temp_path)

        # Clean up the temporary file
        os.remove(temp_path)

        # Calculate the total confidence to normalize the scores
        total_confidence = sum(category_confidence.values())
        if total_confidence > 0:
            sorted_categories = sorted(category_confidence.items(), key=lambda x: x[1], reverse=True)[:4]
            top_categories_names = [item[0] for item in sorted_categories]
            corresponding_percentages = [100 * item[1] / total_confidence for item in sorted_categories]
        else:
            top_categories_names = []
            corresponding_percentages = [0] * 4  # To ensure we return four zeros if total confidence is zero
        
        i = 0
        for val in corresponding_percentages:
            corresponding_percentages[i] = val - 2
            i = i + 1

        return jsonify({
            'TopCategories': top_categories_names,
            'CorrespondingPercentages': corresponding_percentages
        })


def detect_text(path):
    """Detects text in the file and categorizes."""
    credential_path = "/Users/Harshith/Desktop/General Coding/humblebrag/humblebrag/credentials.json"
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path
    client = vision.ImageAnnotatorClient()

    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)
    response = client.text_detection(image=image)
    texts = response.text_annotations

    category_confidence = defaultdict(float)
    if texts:
        detected_text = texts[0].description
        words = detected_text.split("\n")

        model = SentenceTransformer("mixedbread-ai/mxbai-embed-large-v1")
        docs = topics()
        all_embeddings = model.encode(docs)

        for word in words:
            word_embedding = model.encode(word)
            similarities = cos_sim(word_embedding, all_embeddings)
            for idx, confidence in enumerate(similarities[0]):
                category_confidence[docs[idx]] += confidence.item()

    if response.error.message:
        raise Exception(f"{response.error.message}\nFor more info on error messages, check: https://cloud.google.com/apis/design/errors")

    return category_confidence

def topics():
    return [
        "Professional Networking", "Team Building", "Hobbies and Crafts", "Food and Cooking",
        "Health and Fitness", "Book Clubs", "Music Appreciation", "Travel and Adventure",
        "Technology and Gadgets", "Language Exchange", "Cultural Exchange", "Environmental Activism",
        "Volunteering Opportunities", "Pet Lovers", "Gardening and Horticulture", "Photography",
        "Art and Design", "Film and Cinema", "Fashion and Style", "Beauty and Skincare", "Parenting",
        "Educational Resources", "Entrepreneurship", "Investment and Finance", "Real Estate",
        "Automobile Enthusiasts", "Sports Fans", "Fitness and Workout", "Yoga and Meditation",
        "Dance and Performance", "Cooking and Baking", "DIY Projects", "Science and Innovation",
        "History Buffs", "Literature and Writing", "Comics and Anime", "Board Games and Puzzles",
        "Outdoor Activities", "Camping and Hiking", "Cycling", "Running and Jogging", "Swimming",
        "Martial Arts", "Digital Marketing", "Software Development", "Graphic Design",
        "Music Production", "Podcasting", "Blogging and Vlogging"
    ]

if __name__ == "__main__":
    app.run(debug=True)
