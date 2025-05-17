// Fetch data from Flask backend API
fetch('http://127.0.0.1:5000/api/greet')
  .then(response => response.json())
  .then(data => {
    document.getElementById('message').innerText = data.message;
  })
  .catch(error => {
    console.error('Error fetching API:', error);
  });
