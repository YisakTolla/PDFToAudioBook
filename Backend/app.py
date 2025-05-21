from flask import Flask, jsonify, request
from flask_cors import CORS
import pdfParser
import tempfile, os

app = Flask(__name__)
CORS(app)

@app.route('/api/greet')
def greet():
    return jsonify({'message': 'Test from Python backend'})

@app.route("/api/upload", methods=["POST"])
def upload():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file provided"}), 400

        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "No file selected"}), 400

        # --- NEW: read directly from the uploaded stream ---
        file_bytes = file.read()  # still in memory
        extracted_text = pdfParser.parse_pdf(file_bytes)

        # Optional: if you prefer using a temp file instead:
        # with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        #     file.save(tmp)
        #     tmp_path = tmp.name
        # extracted_text = pdfParser.parse_pdf(tmp_path)
        # os.remove(tmp_path)

        if extracted_text:
            return jsonify(
                {
                    "message": "PDF parsed successfully!",
                    "text": extracted_text,
                    "filename": file.filename,
                }
            )
        return jsonify({"error": "Failed to parse PDF"}), 400

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route("/api/upload", methods=["POST"])
def playAudio():
    return 0

if __name__ == '__main__':
    app.run(debug=True)
