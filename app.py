from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/upload", methods=["POST"])
def upload_image():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    
    image = request.files["image"]
    try:
        img = Image.open(image)
        small_img = img.resize((1, 1))
        dominant_color = small_img.getpixel((0, 0))
        hex_color = "#{:02x}{:02x}{:02x}".format(*dominant_color)
        return jsonify({"hex_color": hex_color}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)