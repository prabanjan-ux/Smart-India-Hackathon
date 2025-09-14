from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, User

app = Flask(__name__)
CORS(app)

# MySQL connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:Chitra%40143@localhost:3306/user_auth'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()  # Creates tables if they don't exist

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    name = data.get('name')
    phone = data.get('phone')
    email = data.get('email')
    roll_number = data.get('rollNumber')
    school = data.get('school')
    class_name = data.get('className')
    password = data.get('password')

    # Check if user already exists
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400

    new_user = User(
        name=name,
        phone=phone,
        email=email,
        roll_number=roll_number,
        school=school,
        class_name=class_name
    )
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Signup successful"}), 201

@app.route('/signin', methods=['POST'])
def signin():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        return jsonify({"message": "Signin successful"})
    return jsonify({"error": "Invalid email or password"}), 400

if __name__ == "__main__":
    app.run(debug=True)