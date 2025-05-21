// Fetch greeting from Flask backend
fetch('http://127.0.0.1:5000/api/greet')
  .then(response => response.json())
  .then(data => {
    const messageElement = document.getElementById('message');
    if (messageElement) {
      messageElement.innerText = data.message;
    }
  })
  .catch(error => {
    console.error('Error fetching API:', error);
  });

// DOM elements for upload
const pdfInput = document.getElementById('pdfInput');
const uploadBtn = document.getElementById('uploadBtn');
const uploadStatus = document.getElementById('uploadStatus');

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
        uploadStatus.innerHTML = `<div style="text-align: center;"><span style="color: green;">${file.name} processed successfully!</span></div>`;
        console.log('Extracted text:', data.text);
      }
    })
    .catch(error => {
      console.error('Error uploading PDF:', error);
      uploadStatus.innerHTML = '<span style="color: red;">Error uploading PDF</span>';
    });
}

// Voice selection toggle
document.addEventListener('DOMContentLoaded', function () {
  const voiceToggleBtn = document.getElementById('voiceToggleBtn');
  const voiceSelectionOptions = document.getElementById('voiceSelectionOptions');

  voiceToggleBtn.addEventListener('click', function () {
    voiceSelectionOptions.style.display = voiceSelectionOptions.style.display === 'block' ? 'none' : 'block';
  });
});

// Track selected voice
let selectedVoice = 'voice1';
const voiceSelect = document.getElementById('voiceSelect');
voiceSelect.addEventListener('change', function (event) {
  selectedVoice = event.target.value;
  console.log('Selected voice:', selectedVoice);
});

// Speed control
let speechSpeed = 1.0;
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');

speedSlider.addEventListener('input', (event) => {
  const speed = parseFloat(event.target.value);
  speechSpeed = speed;
  speedValue.textContent = `${speed}x`;

  const percentage = ((speed - 0.5) / (2 - 0.5)) * 100;
  event.target.style.setProperty('--value', `${percentage}%`);

  console.log(`Speech speed set to: ${speechSpeed}x`);
});

document.addEventListener('DOMContentLoaded', () => {
  const initialSpeed = parseFloat(speedSlider.value);
  const initialPercentage = ((initialSpeed - 0.5) / (2 - 0.5)) * 100;
  speedSlider.style.setProperty('--value', `${initialPercentage}%`);
});

// Play Audio button logic
const playBtn = document.getElementById('PlayAudio');
playBtn.addEventListener('click', () => {
  console.log(`Playing audio with voice: ${selectedVoice}, speed: ${speechSpeed}x`);

  // Future: use this data to play audio
  // e.g., send to backend or use speechSynthesis API
});
