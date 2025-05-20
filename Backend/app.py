from flask import Flask, jsonify
from flask_cors import CORS
import pdfParser

app = Flask(__name__)
CORS(app)

pdfParserVar = pdfParser() 

@app.route('/api/greet')
def greet():
    return jsonify({'message': 'Test from python backend'})

@app.route('/api/upload', methods=['GET', 'POST'])
def upload():  # Fixed function name (was 'greet')
    try:
        if request.method == 'POST':
            # Handle file upload from frontend
            if 'file' in request.files:
                file = request.files['file']
                if file.filename != '':
                    # Save the uploaded file temporarily
                    file_path = f"temp_{file.filename}"
                    file.save(file_path)
                    
                    # Parse the PDF
                    extracted_text = pdfParser.parse_pdf(file_path)
                    
                    if extracted_text:
                        return jsonify({
                            'message': 'PDF parsed successfully!',
                            'text': extracted_text,
                            'filename': file.filename
                        })
                    else:
                        return jsonify({'error': 'Failed to parse PDF'}), 400
                else:
                    return jsonify({'error': 'No file selected'}), 400
            else:
                return jsonify({'error': 'No file provided'}), 400
        else:
            # GET request - use file dialog
            file_path = pdfParser.obtain_file_path()
            if file_path:
                extracted_text = pdfParser.parse_pdf(file_path)
                
                if extracted_text:
                    return jsonify({
                        'message': 'PDF parsed successfully!',
                        'text': extracted_text,
                        'file_path': file_path
                    })
                else:
                    return jsonify({'error': 'Failed to parse PDF'}), 400
            else:
                return jsonify({'error': 'No file selected'}), 400
                
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
