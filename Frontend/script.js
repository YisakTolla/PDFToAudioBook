// Fetch greeting from Flask backend
fetch('https://pdftoaudiobook-xmuk.onrender.com/api/greet')
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

// Upload and PDF handling
const pdfInput = document.getElementById('pdfInput');
const uploadArea = document.getElementById('uploadArea');
const uploadStatus = document.getElementById('uploadStatus');
const uploadContent = document.getElementById('uploadContent');
const fileUploaded = document.getElementById('fileUploaded');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');

pdfInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file && file.type === 'application/pdf') {
    uploadContent.classList.add('hidden');
    fileUploaded.classList.remove('hidden');
    fileName.textContent = file.name;
    fileSize.textContent = `${(file.size / 1024 / 1024).toFixed(1)} MB`;
    uploadPdf(file);
  } else {
    uploadStatus.innerHTML = '<span style="color: red;">Please select a valid PDF file</span>';
  }
});

uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.classList.add('drag-over');
});

uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('drag-over'));

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('drag-over');
  const files = e.dataTransfer.files;
  if (files.length > 0 && files[0].type === 'application/pdf') {
    pdfInput.files = files;
    pdfInput.dispatchEvent(new Event('change', { bubbles: true }));
  }
});

function uploadPdf(file) {
  const formData = new FormData();
  formData.append('file', file);


  fetch('https://pdftoaudiobook-xmuk.onrender.com/api/upload', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        uploadStatus.innerHTML = `<span style="color: red;">Error: ${data.error}</span>`;
      } else {
        console.log('Extracted text:', data.text);
        uploadStatus.innerHTML = `<div style="text-align: center;"><span style="color: green;">${file.name} processed successfully!</span></div>`;
        document.getElementById('extractedText').textContent = data.text;
      }
    })
    .catch(error => {
      console.error('Error uploading PDF:', error);
    });
}

// Voice selection & speech synthesis
let speechSpeed = 1.0;
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');
const playBtn = document.getElementById('PlayAudio');

speedSlider.addEventListener('input', (event) => {
  const speed = parseFloat(event.target.value);
  speechSpeed = speed;
  speedValue.textContent = `${speed}x`;
});

document.addEventListener('DOMContentLoaded', () => {
  speedValue.textContent = `${speedSlider.value}x`;
});

playBtn.addEventListener('click', () => {
  const extractedTextElement = document.getElementById('extractedText');
  const selectedVoice = document.querySelector('input[name="voice"]:checked')?.value;

  if (!extractedTextElement || !extractedTextElement.textContent.trim()) {
    alert("No extracted text found. Upload a PDF first.");
    return;
  }

  const textToRead = extractedTextElement.textContent;
  const utterance = new SpeechSynthesisUtterance(textToRead);

  const voices = speechSynthesis.getVoices();
  const matchingVoice = voices.find(v => v.name.includes(selectedVoice));
  if (matchingVoice) {
    utterance.voice = matchingVoice;
  }

  utterance.rate = speechSpeed;

  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
});