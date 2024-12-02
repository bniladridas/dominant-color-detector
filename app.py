from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import logging
import io

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure logging
logging.basicConfig(level=logging.DEBUG)

@app.route("/upload", methods=["POST"])
def upload_image():
    if "image" not in request.files:
        app.logger.error("No image uploaded")
        return jsonify({"error": "No image uploaded"}), 400
    
    image = request.files["image"]
    try:
        img = Image.open(io.BytesIO(image.read()))
        small_img = img.resize((1, 1))
        dominant_color = small_img.getpixel((0, 0))
        hex_color = "#{:02x}{:02x}{:02x}".format(*dominant_color)
        app.logger.debug(f"Dominant color: {hex_color}")
        return jsonify({"hex_color": hex_color}), 200
    except Exception as e:
        app.logger.error(f"Error processing image: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)