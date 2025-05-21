import textract as tt
import tkinter as tk
from tkinter import filedialog


def obtain_file_path():
    """Grab file path of the selected PDF to be passed into parse function"""
    root = tk.Tk()
    root.withdraw()  # Hide the main window

    # Open file dialog - updated to include PDF files
    file_path = filedialog.askopenfilename(
        title="Select a PDF file",
        filetypes=[("PDF files", "*.pdf"), ("All files", "*.*")]
    )

    if file_path:
        print(f"Selected file: {file_path}")
        return file_path  # Return the file path
    else:
        print("No file selected")
        return None

def parse_pdf(filepath):
    if ".pdf" in filepath:
        text = tt.process(filepath)
        return text
    else:
        text = tt.process(filepath, extension='pdf')
        return text

#Testing
text = tt.process(filename='Backend/PDFs/Sample.pdf')
print(text)