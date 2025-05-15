from flask import Flask, jsonify
#from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
import mysql.connector

import pandas as pd
import numpy as np
import joblib
# from flask import Flask

from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

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
        query = """
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
        """
        cursor.execute(query)
        users = cursor.fetchall()  # Fetch all rows as a list of dictionaries
        return jsonify(users), 200
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/api/k-means', methods=['GET'])
def kmeans():
    """Fetch all households from the database and return as JSON."""
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        query = """
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
        """
        cursor.execute(query)
        users = cursor.fetchall()  # Fetch all rows as a list of dictionaries
        return jsonify(users), 200
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/me/rererererererere')
def me():
    return "Naunsa man ni"
    # return "this is me end point dfgdgfdg"

@app.route('/')
def home():
    return "Hello, Flask ghfghfgh!"

@app.route('/api/recommendations/random/forest', methods=['GET'])
def random_forest_demo():
    try:
        connection = get_db_connection()
        query = """
            SELECT
                (CASE WHEN _1_has_toilet = 'Yes' THEN 1 ELSE 0 END) AS _1_has_toilet,
                (CASE WHEN _2_toilet_used = 'Yes' THEN 1 ELSE 0 END) AS _2_toilet_used,
                (CASE WHEN _3_toilet_functional = 'Yes' THEN 1 ELSE 0 END) AS _3_toilet_functional,
                (CASE WHEN _4_soap = 'Yes' THEN 1 ELSE 0 END) AS _4_soap,
                (CASE WHEN _5_children = 'Yes' THEN 1 ELSE 0 END) AS _5_children,
                (CASE WHEN _6_spaces = 'Yes' THEN 1 ELSE 0 END) AS _6_spaces,
                (CASE WHEN _7_feces = 'Yes' THEN 1 ELSE 0 END) AS _7_feces,
                (CASE WHEN _8_composting = 'Yes' THEN 1 ELSE 0 END) AS _8_composting,
                (CASE WHEN _9_dispose = 'Yes' THEN 1 ELSE 0 END) AS _9_dispose,
                (CASE WHEN _10_emptied = 'Yes' THEN 1 WHEN _10_emptied = 'No' THEN 0 END) AS _10_emptied,
                (CASE WHEN _13_sewer = 'Yes' THEN 1 WHEN _13_sewer = 'No' THEN 0 END) AS _13_sewer,
                (CASE WHEN _15_household = 'Yes' THEN 1 WHEN _15_household = 'No' THEN 0 END) AS _15_household,
                (CASE WHEN _16_household = 'Yes' THEN 0 WHEN _16_household = 'No' THEN 0 END) AS _16_household,
                (CASE WHEN _17_using = 'Yes' THEN 1 WHEN _17_using = 'No' THEN 0 END) AS _17_using,
                (CASE WHEN _19_materials = 'Yes' THEN 1 WHEN _19_materials = 'No' THEN 0 END) AS _19_materials,
            (CASE WHEN relative_risk_assessment='Open Defecation G0' THEN 0
            WHEN relative_risk_assessment="Zero Open Defecation G1" THEN 0
            WHEN relative_risk_assessment="Basic Sanitation G2" THEN 1
            WHEN relative_risk_assessment="Safely Managed G3" THEN 1 END) AS relative_risk_assessment
            FROM house_holds
        """
        df = pd.read_sql(query, connection)
        connection.close()

        # Compute dependent variable
        # df["relative_risk_assessment"] = df.iloc[:, :15].sum(axis=1)
        # df["relative_risk_assessment"] = np.where(df["relative_risk_assessment"] > 11, 1, 0)
        # df["relative_risk_assessment"] = np.where((df["_6_spaces"] == 0) | (df["_7_feces"] == 0), 0, df["relative_risk_assessment"])
        df["relative_risk_assessment"] = df.iloc[:, :-1].sum(axis=1)
        df["relative_risk_assessment"] = np.where(df["relative_risk_assessment"] > 11, 1, 0)
        df["relative_risk_assessment"] = np.where(
            (df["_6_spaces"] == 0) | (df["_7_feces"] == 0), 0, df["relative_risk_assessment"]
        )

        # Split data
        X = df.iloc[:, :-1]
        y = df["relative_risk_assessment"]
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # Train model
        rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
        rf_model.fit(X_train, y_train)

        # Evaluate model
        y_pred = rf_model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        # print(f"Model Accuracy: {accuracy_score(y_test, y_pred):.2f}")

        # Save the trained model
        joblib.dump(rf_model, "risk_assessment_rf.pkl")

        # Simulate four random surveys

        survey_results = []
        # for i in range(1, 5):
        #     random_survey = np.random.randint(0, 2, size=(1, X.shape[1]))
        #     forecasted_risk = rf_model.predict(random_survey)[0]
        #     survey_results.append({
        #         "survey": i,
        #         "features": random_survey.tolist()[0],
        #         "forecasted_risk": int(forecasted_risk)
        #     })



        # return jsonify({
        #     "accuracy": round(accuracy, 2),
        #     "survey_predictions": survey_results
        # }), 200
        fixed_survey = np.array([
            1,  # _1_has_toilet
            1,  # _2_toilet_used
            1,  # _3_toilet_functional
            1,  # _4_soap
            1,  # _5_children
            1,  # _6_spaces (Critical factor)
            1,  # _7_feces
            1,  # _8_composting
            1,  # _9_dispose
            1,  # _10_emptied
            1,  # _13_sewer
            1,  # _15_household
            1,  # _16_household
            0,  # _17_using
            0,  # _19_materials
            # 1   # Some additional feature
        ]).reshape(1, -1)  # Convert to 2D array for prediction

        # Predict risk level for the fixed survey
        predicted_risk = rf_model.predict(fixed_survey)[0]

        # Format response
        survey_results = {
            "survey_features": fixed_survey.tolist()[0],
            "predicted_risk_level": int(predicted_risk)
        }

        return jsonify({
            "accuracy": round(accuracy, 2),
            "survey_prediction": survey_results
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        connection.close()


@app.route('/api/recommendations/decision/tree', methods=['GET'])
def decision_tree_demo():
    # return "decision tree demo"
    try:
        connection = get_db_connection()
        query = """
            SELECT
                (CASE WHEN _1_has_toilet = 'Yes' THEN 1 ELSE 0 END) AS _1_has_toilet,
                (CASE WHEN _2_toilet_used = 'Yes' THEN 1 ELSE 0 END) AS _2_toilet_used,
                (CASE WHEN _3_toilet_functional = 'Yes' THEN 1 ELSE 0 END) AS _3_toilet_functional,
                (CASE WHEN _4_soap = 'Yes' THEN 1 ELSE 0 END) AS _4_soap,
                (CASE WHEN _5_children = 'Yes' THEN 1 ELSE 0 END) AS _5_children,
                (CASE WHEN _6_spaces = 'Yes' THEN 1 ELSE 0 END) AS _6_spaces,
                (CASE WHEN _7_feces = 'Yes' THEN 1 ELSE 0 END) AS _7_feces,
                (CASE WHEN _8_composting = 'Yes' THEN 1 ELSE 0 END) AS _8_composting,
                (CASE WHEN _9_dispose = 'Yes' THEN 1 ELSE 0 END) AS _9_dispose,
                (CASE WHEN _10_emptied = 'Yes' THEN 1 WHEN _10_emptied = 'No' THEN 0 END) AS _10_emptied,
                (CASE WHEN _13_sewer = 'Yes' THEN 1 WHEN _13_sewer = 'No' THEN 0 END) AS _13_sewer,
                (CASE WHEN _15_household = 'Yes' THEN 1 WHEN _15_household = 'No' THEN 0 END) AS _15_household,
                (CASE WHEN _16_household = 'Yes' THEN 0 WHEN _16_household = 'No' THEN 0 END) AS _16_household,
                (CASE WHEN _17_using = 'Yes' THEN 1 WHEN _17_using = 'No' THEN 0 END) AS _17_using,
                (CASE WHEN _19_materials = 'Yes' THEN 1 WHEN _19_materials = 'No' THEN 0 END) AS _19_materials,
            (CASE WHEN relative_risk_assessment='Open Defecation G0' THEN 0
            WHEN relative_risk_assessment="Zero Open Defecation G1" THEN 0
            WHEN relative_risk_assessment="Basic Sanitation G2" THEN 1
            WHEN relative_risk_assessment="Safely Managed G3" THEN 1 END) AS relative_risk_assessment
            FROM house_holds
        """
        df = pd.read_sql(query, connection)
        connection.close()

        df["relative_risk_assessment"] = df.iloc[:, :-1].sum(axis=1)
        df["relative_risk_assessment"] = np.where(df["relative_risk_assessment"] > 11, 1, 0)
        df["relative_risk_assessment"] = np.where(
            (df["_6_spaces"] == 0) | (df["_7_feces"] == 0), 0, df["relative_risk_assessment"]
        )

        # Split data
        X = df.iloc[:, :-1]
        y = df["relative_risk_assessment"]
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # Train Decision Tree model
        dt_model = DecisionTreeClassifier(random_state=42)
        dt_model.fit(X_train, y_train)

        # Evaluate model
        y_pred = dt_model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)

        # Save the trained model
        joblib.dump(dt_model, "risk_assessment_dt.pkl")

        fixed_survey = np.array([
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0
        ]).reshape(1, -1)  # Convert to 2D array for prediction

        # Predict risk level for the fixed survey
        predicted_risk = dt_model.predict(fixed_survey)[0]

        # Format response
        survey_results = {
            "survey_features": fixed_survey.tolist()[0],
            "predicted_risk_level": int(predicted_risk)
        }

        return jsonify({
            "accuracy": round(accuracy, 2),
            "survey_prediction": survey_results
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        connection.close()

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
