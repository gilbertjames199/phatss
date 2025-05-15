from flask import Flask, jsonify
#from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
import mysql.connector


load_dotenv('.env')

app = Flask(__name__)  # Flask application instance
#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://username:password@localhost/db_name'
#app.config['SQLALCHEMY_DATABASE_URI'] = (
#    f"mysql+pymysql://{os.getenv('DB_USERNAME')}:{os.getenv('DB_PASSWORD')}"
#    f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_DATABASE')}"
#)
#app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#db = SQLAlchemy(app)

#from user_model import User
db_config = {
    'host': os.getenv('DB_HOST', '127.0.0.1'),
    'user': os.getenv('DB_USERNAME', 'root'),
    'password': os.getenv('DB_PASSWORD', ''),
    'database': os.getenv('DB_DATABASE', 'test'),
    'port': int(os.getenv('DB_PORT', 3306))
}

def get_db_connection():
    """Establish and return a connection to the MySQL database."""
    return mysql.connector.connect(**db_config)

@app.route('/api/users', methods=['GET'])
def get_users():
    """Fetch all users from the database and return as JSON."""
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM users;"
        cursor.execute(query)
        users = cursor.fetchall()  # Fetch all rows as a list of dictionaries
        return jsonify(users), 200
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/api/households', methods=['GET'])
def recommend_municipality():
    """Fetch all households from the database and return as JSON."""
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM house_holds WHERE id<10000 ORDER BY LAST_NAME2;"
        cursor.execute(query)
        users = cursor.fetchall()  # Fetch all rows as a list of dictionaries
        return jsonify(users), 200
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/me')
def me():
    return "this is me end point"

@app.route('/')
def home():
    return "Hello, Flask!"




if __name__ == '__main__':
    app.run(debug=True)
