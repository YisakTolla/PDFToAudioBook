import fitz  # PyMuPDF
import io
import os
import tempfile
from typing import Union, Optional


def obtain_file_path():
    """
    Open a file dialog to select a PDF file.
    Returns the selected file path or None if cancelled.
    """
    root = tk.Tk()
    root.withdraw()  # Hide the root window

    file_path = filedialog.askopenfilename(
        title="Select a PDF file",
        filetypes=[("PDF files", "*.pdf"), ("All files", "*.*")]
    )

    if file_path:
        print(f"Selected file: {file_path}")
        return file_path
    else:
        print("No file selected")
        return None

def parse_pdf(source: Union[str, bytes, io.BytesIO]) -> Optional[str]:
    """
    Extract text from a PDF.

    Accepts:
      • str  -> path on disk
      • bytes / BytesIO -> in-memory PDF data (e.g., from Flask upload)

    Returns:
      Full text (str) or None on failure.
    """
    try:
        if isinstance(source, (bytes, io.BytesIO)):
            # Open from stream
            doc = fitz.open(stream=source, filetype="pdf")
        else:
            # Assume path string
            doc = fitz.open(source)

        text = "".join(page.get_text() for page in doc)
        doc.close()
        return text
    except Exception as err:
        print(f"[pdfParser] Error reading PDF: {err}")
        return None

# Manual test mode (optional)
if __name__ == "__main__":
    path = obtain_file_path()
    if path:
        extracted_text = parse_pdf(path)
        print(extracted_text)