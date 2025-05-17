from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/greet')
def greet():
    return jsonify({'message': 'Test from python backend'})

if __name__ == '__main__':
    app.run(debug=True)
