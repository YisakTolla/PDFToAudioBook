# PDFToAudioBook

Transform any PDF document into an audiobook with customizable voice and speed controls.

## Features

- Upload PDFs via drag-and-drop (max 50MB)
- Extract text and convert to speech
- Multiple voice options (US English, UK English, Yisak)
- Adjustable playback speed (0.5x - 2.0x)

## Quick Start

### Backend Setup
```bash
pip install -r requirements.txt
python app.py
```

**requirements.txt:**
```
flask
flask-cors
pymupdf
```

### Frontend
Open `index.html` in your browser or serve locally:
```bash
python -m http.server 8000
```

## Usage

1. Upload a PDF file
2. Select voice and speed preferences
3. Click "Generate Audiobook" to start playback

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript, Web Speech API
- **Backend:** Python Flask, PyMuPDF

## API Endpoints

- `GET /api/greet` - Test connection
- `POST /api/upload` - Upload and process PDF

## Browser Support

Requires Web Speech API support (Chrome 33+, Edge 14+, Safari 14.1+)

## Team

Built by Madu, Mohamed, Yisak, and Sai