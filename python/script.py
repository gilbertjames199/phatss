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

@app.route('/api/households', methods=['GET'])
def recommend_municipality():
    """Fetch all households from the database and return as JSON."""
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        query = "
            SELECT
                municipality,
                barangay,
                purok_sitio,
                CASE WHEN _1_has_toilet = 'Yes' THEN 1 WHEN _1_has_toilet = 'No' THEN 0 END AS _1_has_toilet,
                CASE WHEN _2_toilet_used = 'Yes' THEN 1 WHEN _2_toilet_used = 'No' THEN 0 END AS _2_toilet_used,
                CASE WHEN _3_toilet_functional = 'Yes' THEN 1 WHEN _3_toilet_functional = 'No' THEN 0 END AS _3_toilet_functional,
                CASE WHEN _4_soap = 'Yes' THEN 1 WHEN _4_soap = 'No' THEN 0 END AS _4_soap,
                CASE WHEN _6_spaces = 'Yes' THEN 1 WHEN _6_spaces = 'No' THEN 0 END AS _6_spaces,
                CASE WHEN _7_feces = 'Yes' THEN 1 WHEN _7_feces = 'No' THEN 0 END AS _7_feces,
                CASE WHEN _8_composting = 'Yes' THEN 1 WHEN _8_composting = 'No' THEN 0 END AS _8_composting,
                CASE WHEN _9_dispose = 'Yes' THEN 1 WHEN _9_dispose = 'No' THEN 0 END AS _9_dispose,
                CASE WHEN _10_emptied = 'Yes' THEN 1 WHEN _10_emptied = 'No' THEN 0 END AS _10_emptied,
                CASE WHEN _13_sewer = 'Yes' THEN 1 WHEN _13_sewer = 'No' THEN 0 END AS _13_sewer,
                CASE WHEN _15_household = 'Yes' THEN 1 WHEN _15_household = 'No' THEN 0 END AS _15_household,
                CASE WHEN _16_household = 'Yes' THEN 1 WHEN _16_household = 'No' THEN 0 END AS _16_household,
                CASE WHEN _17_using = 'Yes' THEN 1 WHEN _17_using = 'No' THEN 0 END AS _17_using,
                CASE WHEN _19_materials = 'Yes' THEN 1 WHEN _19_materials = 'No' THEN 0 END AS _19_materials
            FROM
                house_holds
            WHERE
                _1_has_toilet IN ('Yes', 'No') AND
                _2_toilet_used IN ('Yes', 'No') AND
                _3_toilet_functional IN ('Yes', 'No') AND
                _4_soap IN ('Yes', 'No') AND
                _6_spaces IN ('Yes', 'No') AND
                _7_feces IN ('Yes', 'No') AND
                _8_composting IN ('Yes', 'No') AND
                _9_dispose IN ('Yes', 'No') AND
                _10_emptied IN ('Yes', 'No') AND
                _13_sewer IN ('Yes', 'No') AND
                _15_household IN ('Yes', 'No') AND
                _16_household IN ('Yes', 'No') AND
                _17_using IN ('Yes', 'No') AND
                _19_materials IN ('Yes', 'No');
        "
        cursor.execute(query)
        users = cursor.fetchall()  # Fetch all rows as a list of dictionaries
        return jsonify(users), 200
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/api/k-means', methods=['GET'])
def k-means():
    """Fetch all households from the database and return as JSON."""
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        query = "
            SELECT
                municipality,
                barangay,
                purok_sitio,
                CASE WHEN _1_has_toilet = 'Yes' THEN 1 WHEN _1_has_toilet = 'No' THEN 0 END AS _1_has_toilet,
                CASE WHEN _2_toilet_used = 'Yes' THEN 1 WHEN _2_toilet_used = 'No' THEN 0 END AS _2_toilet_used,
                CASE WHEN _3_toilet_functional = 'Yes' THEN 1 WHEN _3_toilet_functional = 'No' THEN 0 END AS _3_toilet_functional,
                CASE WHEN _4_soap = 'Yes' THEN 1 WHEN _4_soap = 'No' THEN 0 END AS _4_soap,
                CASE WHEN _6_spaces = 'Yes' THEN 1 WHEN _6_spaces = 'No' THEN 0 END AS _6_spaces,
                CASE WHEN _7_feces = 'Yes' THEN 1 WHEN _7_feces = 'No' THEN 0 END AS _7_feces,
                CASE WHEN _8_composting = 'Yes' THEN 1 WHEN _8_composting = 'No' THEN 0 END AS _8_composting,
                CASE WHEN _9_dispose = 'Yes' THEN 1 WHEN _9_dispose = 'No' THEN 0 END AS _9_dispose,
                CASE WHEN _10_emptied = 'Yes' THEN 1 WHEN _10_emptied = 'No' THEN 0 END AS _10_emptied,
                CASE WHEN _13_sewer = 'Yes' THEN 1 WHEN _13_sewer = 'No' THEN 0 END AS _13_sewer,
                CASE WHEN _15_household = 'Yes' THEN 1 WHEN _15_household = 'No' THEN 0 END AS _15_household,
                CASE WHEN _16_household = 'Yes' THEN 1 WHEN _16_household = 'No' THEN 0 END AS _16_household,
                CASE WHEN _17_using = 'Yes' THEN 1 WHEN _17_using = 'No' THEN 0 END AS _17_using,
                CASE WHEN _19_materials = 'Yes' THEN 1 WHEN _19_materials = 'No' THEN 0 END AS _19_materials
            FROM
                house_holds
            WHERE
                _1_has_toilet IN ('Yes', 'No') AND
                _2_toilet_used IN ('Yes', 'No') AND
                _3_toilet_functional IN ('Yes', 'No') AND
                _4_soap IN ('Yes', 'No') AND
                _6_spaces IN ('Yes', 'No') AND
                _7_feces IN ('Yes', 'No') AND
                _8_composting IN ('Yes', 'No') AND
                _9_dispose IN ('Yes', 'No') AND
                _10_emptied IN ('Yes', 'No') AND
                _13_sewer IN ('Yes', 'No') AND
                _15_household IN ('Yes', 'No') AND
                _16_household IN ('Yes', 'No') AND
                _17_using IN ('Yes', 'No') AND
                _19_materials IN ('Yes', 'No');
        "
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


# SELECT
#     municipality,
#     barangay,
#     purok_sitio,
#     CASE WHEN _1_has_toilet = 'Yes' THEN 1 WHEN _1_has_toilet = 'No' THEN 0 END AS _1_has_toilet,
#     CASE WHEN _2_toilet_used = 'Yes' THEN 1 WHEN _2_toilet_used = 'No' THEN 0 END AS _2_toilet_used,
#     CASE WHEN _3_toilet_functional = 'Yes' THEN 1 WHEN _3_toilet_functional = 'No' THEN 0 END AS _3_toilet_functional,
#     CASE WHEN _4_soap = 'Yes' THEN 1 WHEN _4_soap = 'No' THEN 0 END AS _4_soap,
#     CASE WHEN _6_spaces = 'Yes' THEN 1 WHEN _6_spaces = 'No' THEN 0 END AS _6_spaces,
#     CASE WHEN _7_feces = 'Yes' THEN 1 WHEN _7_feces = 'No' THEN 0 END AS _7_feces,
#     CASE WHEN _8_composting = 'Yes' THEN 1 WHEN _8_composting = 'No' THEN 0 END AS _8_composting,
#     CASE WHEN _9_dispose = 'Yes' THEN 1 WHEN _9_dispose = 'No' THEN 0 END AS _9_dispose,
#     CASE WHEN _10_emptied = 'Yes' THEN 1 WHEN _10_emptied = 'No' THEN 0 END AS _10_emptied,
#     CASE WHEN _13_sewer = 'Yes' THEN 1 WHEN _13_sewer = 'No' THEN 0 END AS _13_sewer,
#     CASE WHEN _15_household = 'Yes' THEN 1 WHEN _15_household = 'No' THEN 0 END AS _15_household,
#     CASE WHEN _16_household = 'Yes' THEN 1 WHEN _16_household = 'No' THEN 0 END AS _16_household,
#     CASE WHEN _17_using = 'Yes' THEN 1 WHEN _17_using = 'No' THEN 0 END AS _17_using,
#     CASE WHEN _19_materials = 'Yes' THEN 1 WHEN _19_materials = 'No' THEN 0 END AS _19_materials
# FROM house_holds WHERE _1_has_toilet IN ('Yes', 'No') AND
#     _2_toilet_used IN ('Yes', 'No') AND
#     _3_toilet_functional IN ('Yes', 'No') AND
#     _4_soap IN ('Yes', 'No') AND
#     _6_spaces IN ('Yes', 'No') AND
#     _7_feces IN ('Yes', 'No') AND
#     _8_composting IN ('Yes', 'No') AND
#     _9_dispose IN ('Yes', 'No') AND
#     _10_emptied IN ('Yes', 'No') AND
#     _13_sewer IN ('Yes', 'No') AND
#     _15_household IN ('Yes', 'No') AND
#     _16_household IN ('Yes', 'No') AND
#     _17_using IN ('Yes', 'No') AND
#     _19_materials IN ('Yes', 'No') AND id<50000
