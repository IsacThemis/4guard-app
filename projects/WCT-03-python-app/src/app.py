from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def hello():
    return jsonify({"status": "online", "engine": "legacy-python"})

if __name__ == '__main__':
    app.run(debug=True)
