
from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid
import time


app = Flask(__name__)

CORS(app)

items = []


@app.route("/api/items", methods=["GET"])
def list_items():
    return jsonify(items), 200



@app.route("/api/items/create_item", methods=["POST"])
def create_item():
    data = request.get_json()

    if not data:
        return jsonify({"Error, INVALID JSON: "}), 400

    name = data.get("name")
    if not name:
        return jsonify({"Error, INVALID JSON: "}), 400

    email = data.get("email")
    if not email:
        return jsonify({"Error, INVALID JSON: "}), 400

    new_item = {
        'id': str(uuid.uuid4()),
        'name': name,
        'email': email,
        'created_at': int(time.time())
    }

    items.append(new_item)

    return jsonify(new_item), 201, {"Location": f"/api/items/{new_item['id']}"}



if __name__ == "__main__":
    app.run(debug=True, port=5000)
