from flask import Flask, render_template, request, jsonify
import json
import requests

app = Flask(__name__)


# referred to the link - https://www.geeksforgeeks.org/flask-creating-first-simple-application/

@app.route('/')
def default():
    # https://stackoverflow.com/questions/48189684/how-to-parse-json-array-of-objects-in-python
    response = json.loads(requests.get("http://localhost:3000/api/books").text)
    return render_template('listOfBooks.html', output_data=response)


if __name__ == '__main__':
    app.run(debug=True)
