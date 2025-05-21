// Fetch data from Flask backend API
fetch('http://127.0.0.1:5000/api/greet')
  .then(response => response.json())
  .then(data => {
    // Check if message element exists before trying to set its content
    const messageElement = document.getElementById('message');
    if (messageElement) {
      messageElement.innerText = data.message;
    }
  })
  .catch(error => {
    console.error('Error fetching API:', error);
  });

// DOM elements for upload functionality
const pdfInput = document.getElementById('pdfInput');
const uploadBtn = document.getElementById('uploadBtn');
const uploadStatus = document.getElementById('uploadStatus');

// PDF Upload functionality
uploadBtn.addEventListener('click', () => {
  pdfInput.click();
});

pdfInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file && file.type === 'application/pdf') {
    uploadPdf(file);
  } else {
    uploadStatus.innerHTML = '<span style="color: red;">Please select a valid PDF file</span>';
  }
});

function uploadPdf(file) {
  const formData = new FormData();
  formData.append('file', file);
  
  uploadStatus.innerHTML = '<span style="color: blue;">Uploading and processing PDF...</span>';
  
  fetch('http://127.0.0.1:5000/api/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      uploadStatus.innerHTML = `<span style="color: red;">Error: ${data.error}</span>`;
    } else {
      uploadStatus.innerHTML = '<span style="color: green;">PDF processed successfully!</span>';
      console.log('Extracted text:', data.text);
      // You can store the extracted text in a variable or display it somewhere
      // For example: document.getElementById('extractedText').innerText = data.text;
    }
  })
  .catch(error => {
    console.error('Error uploading PDF:', error);
    uploadStatus.innerHTML = '<span style="color: red;">Error uploading PDF</span>';
  });
}

// DOM elements for speed control
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');

// Speed adjustment functionality
speedSlider.addEventListener('input', (event) => {
  const speed = parseFloat(event.target.value);
  speedValue.textContent = `${speed}x`;
  
  // Update the track color based on slider position
  const percentage = ((speed - 0.5) / (2 - 0.5)) * 100;
  event.target.style.setProperty('--value', `${percentage}%`);
  
  console.log(`Speech speed set to: ${speed}x`);
});

// Initialize the slider appearance
document.addEventListener('DOMContentLoaded', () => {
  const initialSpeed = parseFloat(speedSlider.value);
  const initialPercentage = ((initialSpeed - 0.5) / (2 - 0.5)) * 100;
  speedSlider.style.setProperty('--value', `${initialPercentage}%`);
});

document.addEventListener('DOMContentLoaded', function() {
   const voiceToggleBtn = document.getElementById('voiceToggleBtn');
   const voiceSelectionOptions = document.getElementById('voiceSelectionOptions');
   
   voiceToggleBtn.addEventListener('click', function() {
     if (voiceSelectionOptions.style.display === 'block' || voiceSelectionOptions.style.display === '') {
       voiceSelectionOptions.style.display = 'none';
     } else {
       voiceSelectionOptions.style.display = 'block';
     }
   });
 });