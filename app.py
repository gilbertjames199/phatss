from flask import Flask, request, jsonify
from db import get_db_connection
from python import pretrainer
from python import rf_kmeans
# from python import train_model
import pandas as pd
import joblib
import numpy as np


from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import GaussianNB
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.impute import SimpleImputer

# from dotenv import load_dotenv
# import os
# import mysql.connector

# load_dotenv('.env')

app = Flask(__name__)  # Flask application instance


@app.route('/api/users', methods=['GET'])
def get_users():
    """Fetch all users from the database and return as JSON."""
    # return jsonify({'users page': 'user page'})
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        query = "SELECT risk_level, relative_risk_assessment, municipality, barangay, purok_sitio, CASE WHEN _1_has_toilet = 'Yes' THEN 1 WHEN _1_has_toilet = 'No' THEN 0 END AS _1_has_toilet, CASE WHEN _2_toilet_used = 'Yes' THEN 1 WHEN _2_toilet_used = 'No' THEN 0 END AS _2_toilet_used, CASE WHEN _3_toilet_functional = 'Yes' THEN 1 WHEN _3_toilet_functional = 'No' THEN 0 END AS _3_toilet_functional, CASE WHEN _4_soap = 'Yes' THEN 1 WHEN _4_soap = 'No' THEN 0 END AS _4_soap, CASE WHEN _6_spaces = 'Yes' THEN 1 WHEN _6_spaces = 'No' THEN 0 END AS _6_spaces, CASE WHEN _7_feces = 'Yes' THEN 1 WHEN _7_feces = 'No' THEN 0 END AS _7_feces, CASE WHEN _8_composting = 'Yes' THEN 1 WHEN _8_composting = 'No' THEN 0 END AS _8_composting, CASE WHEN _9_dispose = 'Yes' THEN 1 WHEN _9_dispose = 'No' THEN 0 END AS _9_dispose, CASE WHEN _10_emptied = 'Yes' THEN 1 WHEN _10_emptied = 'No' THEN 0 END AS _10_emptied, CASE WHEN _13_sewer = 'Yes' THEN 1 WHEN _13_sewer = 'No' THEN 0 END AS _13_sewer, CASE WHEN _15_household = 'Yes' THEN 1 WHEN _15_household = 'No' THEN 0 END AS _15_household, CASE WHEN _16_household = 'Yes' THEN 1 WHEN _16_household = 'No' THEN 0 END AS _16_household, CASE WHEN _17_using = 'Yes' THEN 1 WHEN _17_using = 'No' THEN 0 END AS _17_using, CASE WHEN _19_materials = 'Yes' THEN 1 WHEN _19_materials = 'No' THEN 0 END AS _19_materials FROM house_holds WHERE _1_has_toilet IN ('Yes', 'No') AND _2_toilet_used IN ('Yes', 'No') AND _3_toilet_functional IN ('Yes', 'No') AND _4_soap IN ('Yes', 'No') AND _6_spaces IN ('Yes', 'No') AND _7_feces IN ('Yes', 'No') AND _8_composting IN ('Yes', 'No') AND _9_dispose IN ('Yes', 'No') AND _10_emptied IN ('Yes', 'No') AND _13_sewer IN ('Yes', 'No') AND _15_household IN ('Yes', 'No') AND _16_household IN ('Yes', 'No') AND _17_using IN ('Yes', 'No') AND _19_materials IN ('Yes', 'No') AND id<50000;"
        cursor.execute(query)
        users = cursor.fetchall()  # Fetch all rows as a list of dictionaries
        return jsonify(users), 200
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/api/panda/data', methods=['GET'])
def get_data_panda():
    """Fetch all users from the database and return as JSON."""
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        # Define your query
        query = """
        SELECT
            risk_level, relative_risk_assessment, municipality, barangay, purok_sitio,
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
            _19_materials IN ('Yes', 'No') AND
            id < 100000;
        """
        cursor.execute(query)

        # Fetch all rows
        users = cursor.fetchall()  # This should return a list of dictionaries
        # return jsonify(users), 200
        df = pd.DataFrame(users)
        return df

    except mysql.connector.Error as err:
        return jsonify({'error': f"Database error: {err}"}), 500

    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'connection' in locals():
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

@app.route('/all-households-data', methods=['GET'])
def fetch_data():
    # Replace with your actual database path or use SQLAlchemy if needed
    """Fetch all households from the database and return as JSON."""
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
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
                    WHEN relative_risk_assessment="Zero Open Defecation G1" THEN 1
                    WHEN relative_risk_assessment="Basic Sanitation G2" THEN 2
                    WHEN relative_risk_assessment="Safely Managed G3" THEN 3 END) AS relative_risk_assessment
            FROM house_holds
        """
        cursor.execute(query)
        users = cursor.fetchall()  # Fetch all rows as a list of dictionaries
        return users
        # return jsonify(users), 200
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/train-gbm', methods=['GET'])
def train_gradient_boosting():
    global trained_gbm_model, feature_columns

    data = fetch_data()
    df = pd.DataFrame(data)

    df_clean = df.dropna()
    X = df_clean.drop(columns=['relative_risk_assessment'])
    y = df_clean['relative_risk_assessment']

    # Enforce rule: if _6_spaces == 0 or _7_feces == 0, then risk = 0
    force_zero_condition = (X['_6_spaces'] == 0) | (X['_7_feces'] == 0)
    y[force_zero_condition] = 0  # Overwrite labels where condition is met

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    model = GradientBoostingClassifier(random_state=42)
    model.fit(X_train, y_train)

    trained_gbm_model = model
    feature_columns = list(X.columns)  # Save for use in prediction

    y_pred = model.predict(X_test)

    # Metrics
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='weighted', zero_division=0)
    recall = recall_score(y_test, y_pred, average='weighted', zero_division=0)
    f1 = f1_score(y_test, y_pred, average='weighted', zero_division=0)

    # Calculate feature importances
    feature_importances = model.feature_importances_
    importance_dict = {
        feature: round(importance, 4)
        for feature, importance in zip(feature_columns, feature_importances)
    }
    return jsonify({
        'Accuracy': round(accuracy, 4),
        'Precision': round(precision, 4),
        'Recall': round(recall, 4),
        'F1 Score': round(f1, 4),
        'Feature Importances': importance_dict
    })

@app.route('/predict-gbm', methods=['GET'])
def predict_gradient_boosting():
    global trained_gbm_model, feature_columns

    if trained_gbm_model is None:
        return jsonify({'error': 'Model has not been trained yet. Call /train-gbm first.'}), 400

    # Extract feature values from query parameters
    try:
        features = [int(request.args.get(col)) for col in feature_columns]
        input_array = np.array([features])
        prediction = trained_gbm_model.predict(input_array)[0]
        return jsonify({'prediction': int(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/train-rf-local', methods=['GET'])
def train_random_forest_local():
    global trained_rf_model, feature_columns

    data = fetch_data()
    df = pd.DataFrame(data)

    df_clean = df.dropna()
    X = df_clean.drop(columns=['relative_risk_assessment'])
    y = df_clean['relative_risk_assessment']

    # Enforce rule: if _6_spaces == 0 or _7_feces == 0, then risk = 0
    force_zero_condition = (X['_6_spaces'] == 0) | (X['_7_feces'] == 0)
    y[force_zero_condition] = 0  # Overwrite labels where condition is met

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    model = RandomForestClassifier(random_state=42)
    model.fit(X_train, y_train)

    trained_rf_model = model
    feature_columns = list(X.columns)  # Save for use in prediction

    y_pred = model.predict(X_test)

    # Metrics
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='weighted', zero_division=0)
    recall = recall_score(y_test, y_pred, average='weighted', zero_division=0)
    f1 = f1_score(y_test, y_pred, average='weighted', zero_division=0)

    # Calculate feature importances
    feature_importances = model.feature_importances_
    importance_dict = {
        feature: round(importance, 4)
        for feature, importance in zip(feature_columns, feature_importances)
    }

    return jsonify({
        'Accuracy': round(accuracy, 4),
        'Precision': round(precision, 4),
        'Recall': round(recall, 4),
        'F1 Score': round(f1, 4),
        'Feature Importances': importance_dict
    })

@app.route('/train-dt', methods=['GET'])
def train_decision_tree():
    global trained_dt_model, feature_columns

    data = fetch_data()
    df = pd.DataFrame(data)

    df_clean = df.dropna()
    X = df_clean.drop(columns=['relative_risk_assessment'])
    y = df_clean['relative_risk_assessment']

    # Enforce rule: if _6_spaces == 0 or _7_feces == 0, then risk = 0
    force_zero_condition = (X['_6_spaces'] == 0) | (X['_7_feces'] == 0)
    y[force_zero_condition] = 0  # Overwrite labels where condition is met

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    model = DecisionTreeClassifier(random_state=42)
    model.fit(X_train, y_train)

    trained_dt_model = model
    feature_columns = list(X.columns)  # Save for use in prediction

    y_pred = model.predict(X_test)

    # Metrics
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='weighted', zero_division=0)
    recall = recall_score(y_test, y_pred, average='weighted', zero_division=0)
    f1 = f1_score(y_test, y_pred, average='weighted', zero_division=0)

    # Calculate feature importances
    feature_importances = model.feature_importances_
    importance_dict = {
        feature: round(importance, 4)
        for feature, importance in zip(feature_columns, feature_importances)
    }

    return jsonify({
        'Accuracy': round(accuracy, 4),
        'Precision': round(precision, 4),
        'Recall': round(recall, 4),
        'F1 Score': round(f1, 4),
        'Feature Importances': importance_dict
    })

@app.route('/train-lr', methods=['GET'])
def train_logistic_regression():
    global trained_lr_model, feature_columns

    data = fetch_data()
    df = pd.DataFrame(data)

    df_clean = df.dropna()
    X = df_clean.drop(columns=['relative_risk_assessment'])
    y = df_clean['relative_risk_assessment']

    # Enforce rule: if _6_spaces == 0 or _7_feces == 0, then risk = 0
    force_zero_condition = (X['_6_spaces'] == 0) | (X['_7_feces'] == 0)
    y[force_zero_condition] = 0  # Overwrite labels where condition is met

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    model = LogisticRegression(max_iter=1000, random_state=42)
    model.fit(X_train, y_train)

    trained_lr_model = model
    feature_columns = list(X.columns)  # Save for use in prediction

    y_pred = model.predict(X_test)

    # Metrics
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='weighted', zero_division=0)
    recall = recall_score(y_test, y_pred, average='weighted', zero_division=0)
    f1 = f1_score(y_test, y_pred, average='weighted', zero_division=0)

    # Feature importances using model coefficients (mean absolute values across classes)
    coefs = model.coef_
    if len(coefs.shape) > 1:
        mean_abs_coefs = abs(coefs).mean(axis=0)
    else:
        mean_abs_coefs = abs(coefs)

    importance_dict = {
        feature: round(importance, 4)
        for feature, importance in zip(feature_columns, mean_abs_coefs)
    }

    return jsonify({
        'Accuracy': round(accuracy, 4),
        'Precision': round(precision, 4),
        'Recall': round(recall, 4),
        'F1 Score': round(f1, 4),
        'Feature Importances (via Coefficients)': importance_dict
    })

@app.route('/me')
def me():
    return "this is me end point"

@app.route('/')
def home():
    return "Hello, Flask!"

@app.route('/data/training')
def pretrainer_main():
    response = get_data_panda()

    # pretrain = pretrainer.preprocess_data(response)
    X_train, X_test, y_train, y_test, le = pretrainer.preprocess_data(response)

    # Fetch and preprocess data
    # data = fetch_data_for_training()
    # X_train, X_test, y_train, y_test, label_encoder = preprocess_data(data)

    # Train and save the model
    model = train_model.train_model(X_train, y_train)

    # Save the model and label encoder
    import joblib
    joblib.dump(model, 'risk_assessment_model.pkl')
    joblib.dump(le, 'label_encoder.pkl')
    # pretrain = data.dropna(subset=['risk_level'])
    # return response
    return "Training finished!"
    # return X_train.tohtml()

model = joblib.load('risk_assessment_model.pkl')
label_encoder = joblib.load('label_encoder.pkl')

@app.route('/api/recommendations', methods=['GET'])
def show_municipality():
    # return "recommend municipality"
    try:
        connection = get_db_connection()
        query = """
            SELECT
            risk_level, relative_risk_assessment, municipality, barangay, purok_sitio,
            CASE WHEN _1_has_toilet = 'Yes' THEN 1 WHEN _1_has_toilet = 'No' THEN 0 END AS _1_has_toilet,
            CASE WHEN _2_toilet_used = 'Yes' THEN 1 WHEN _2_toilet_used = 'No' THEN 0 END AS _2_toilet_used,
            CASE WHEN _3_toilet_functional = 'Yes' THEN 1 WHEN _3_toilet_functional = 'No' THEN 0 END AS _3_toilet_functional,
            CASE WHEN _4_soap = 'Yes' THEN 1 WHEN _4_soap = 'No' THEN 0 END AS _4_soap,
            CASE WHEN _6_spaces = 'Yes' THEN 1 WHEN _6_spaces = 'No' THEN 0 END AS _6_spaces,
            CASE WHEN _7_feces = 'Yes' THEN 1 WHEN _7_feces = 'No' THEN 0 END AS _7_feces,
            CASE WHEN _8_composting = 'Yes' THEN 1 WHEN _8_composting = 'No' THEN 0 END AS _8_composting,
            CASE WHEN _9_dispose = 'Yes' THEN 1 WHEN _9_dispose = 'No' THEN 0 END AS _9_dispose
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
            id < 100000;
        """
        data = pd.read_sql(query, connection)

        # Preprocess the data for prediction
        features = data[['_1_has_toilet', '_2_toilet_used', '_3_toilet_functional',
                         '_4_soap', '_6_spaces', '_7_feces',
                         '_8_composting', '_9_dispose']].fillna(0)
        predictions = model.predict(features)

        # Decode predicted risk levels
        data['predicted_risk_level'] = label_encoder.inverse_transform(predictions)

        # Convert risk levels to numeric for proper aggregation
        data['predicted_risk_level_numeric'] = data['predicted_risk_level'].astype(int)

        # Aggregate risk levels by municipality
        summary = data.groupby('municipality').agg(
            total_risk_level=('predicted_risk_level_numeric', 'sum')
        ).reset_index()

        # Find the municipality needing the most assistance (lowest total risk level)
        municipality_needing_assistance = summary.loc[summary['total_risk_level'].idxmin()]

        # Return results
        # return jsonify({
        #     "municipality": municipality_needing_assistance['municipality'],
        #     "total_risk_level": municipality_needing_assistance['total_risk_level']
        # }), 200
        return jsonify({
            "municipality": str(municipality_needing_assistance['municipality']),  # Ensure string type
            "total_risk_level": int(municipality_needing_assistance['total_risk_level'])  # Convert to Python int
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        connection.close()
    # try:
    #     connection = get_db_connection()
    #     query = """
    #         SELECT
    #         risk_level, relative_risk_assessment, municipality, barangay, purok_sitio,
    #         CASE WHEN _1_has_toilet = 'Yes' THEN 1 WHEN _1_has_toilet = 'No' THEN 0 END AS _1_has_toilet,
    #         CASE WHEN _2_toilet_used = 'Yes' THEN 1 WHEN _2_toilet_used = 'No' THEN 0 END AS _2_toilet_used,
    #         CASE WHEN _3_toilet_functional = 'Yes' THEN 1 WHEN _3_toilet_functional = 'No' THEN 0 END AS _3_toilet_functional,
    #         CASE WHEN _4_soap = 'Yes' THEN 1 WHEN _4_soap = 'No' THEN 0 END AS _4_soap,
    #         CASE WHEN _6_spaces = 'Yes' THEN 1 WHEN _6_spaces = 'No' THEN 0 END AS _6_spaces,
    #         CASE WHEN _7_feces = 'Yes' THEN 1 WHEN _7_feces = 'No' THEN 0 END AS _7_feces,
    #         CASE WHEN _8_composting = 'Yes' THEN 1 WHEN _8_composting = 'No' THEN 0 END AS _8_composting,
    #         CASE WHEN _9_dispose = 'Yes' THEN 1 WHEN _9_dispose = 'No' THEN 0 END AS _9_dispose,
    #         CASE WHEN _10_emptied = 'Yes' THEN 1 WHEN _10_emptied = 'No' THEN 0 END AS _10_emptied,
    #         CASE WHEN _13_sewer = 'Yes' THEN 1 WHEN _13_sewer = 'No' THEN 0 END AS _13_sewer,
    #         CASE WHEN _15_household = 'Yes' THEN 1 WHEN _15_household = 'No' THEN 0 END AS _15_household,
    #         CASE WHEN _16_household = 'Yes' THEN 1 WHEN _16_household = 'No' THEN 0 END AS _16_household,
    #         CASE WHEN _17_using = 'Yes' THEN 1 WHEN _17_using = 'No' THEN 0 END AS _17_using,
    #         CASE WHEN _19_materials = 'Yes' THEN 1 WHEN _19_materials = 'No' THEN 0 END AS _19_materials
    #     FROM
    #         house_holds
    #     WHERE
    #         _1_has_toilet IN ('Yes', 'No') AND
    #         _2_toilet_used IN ('Yes', 'No') AND
    #         _3_toilet_functional IN ('Yes', 'No') AND
    #         _4_soap IN ('Yes', 'No') AND
    #         _6_spaces IN ('Yes', 'No') AND
    #         _7_feces IN ('Yes', 'No') AND
    #         _8_composting IN ('Yes', 'No') AND
    #         _9_dispose IN ('Yes', 'No') AND
    #         _10_emptied IN ('Yes', 'No') AND
    #         _13_sewer IN ('Yes', 'No') AND
    #         _15_household IN ('Yes', 'No') AND
    #         _16_household IN ('Yes', 'No') AND
    #         _17_using IN ('Yes', 'No') AND
    #         _19_materials IN ('Yes', 'No') AND
    #         id < 100000;
    #     """
    #     data = pd.read_sql(query, connection)

    #     # Preprocess and predict
    #     features = data[['_1_has_toilet', '_2_toilet_used', '_3_toilet_functional',
    #                      '_4_soap',  '_6_spaces', '_7_feces',
    #                      '_8_composting', '_9_dispose']].fillna(0)
    #     predictions = model.predict(features)

    #     # Decode risk levels and aggregate results
    #     data['predicted_risk_level'] = label_encoder.inverse_transform(predictions)
    #     summary = data.groupby('municipality')['predicted_risk_level'].apply(
    #         lambda x: x.value_counts().idxmax()
    #     ).reset_index(name='recommended_risk_level')

    #     return jsonify(summary.to_dict(orient='records')), 200
    # except Exception as e:
    #     return jsonify({'error': str(e)}), 500
    # finally:
        connection.close()

@app.route('/api/print/job/lib', methods=['GET'])
def show_job_lib():
    try:
        # Load the model and label encoder
        model = joblib.load('risk_assessment_model.pkl')
        label_encoder = joblib.load('label_encoder.pkl')

        # Get model details (e.g., parameters and feature importances)
        model_details = {
            "model_type": str(type(model)),
            "model_parameters": model.get_params(),
            "feature_importances": getattr(model, 'feature_importances_', None).tolist() if hasattr(model, 'feature_importances_') else "Not available",
        }

        # Get label encoder details
        label_encoder_details = {
            "classes": label_encoder.classes_.tolist()
        }

        # Combine both details
        details = {
            "model": model_details,
            "label_encoder": label_encoder_details
        }

        return jsonify(details), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500



def data_frame_printer(df):
    table_html = df.to_html(classes='table table-striped', index=False)
    return f"""
        <!DOCTYPE html>
        <html>
        <head>
            <title>Data Table</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5">
                <h1 class="text-center">Data Table</h1>
                <div class="table-responsive">
                    {table_html}
                </div>
            </div>
        </body>
        </html>
    """

@app.route('/train-nb', methods=['GET'])
def train_naive_bayes():
    global trained_nb_model, feature_columns

    data = fetch_data()
    df = pd.DataFrame(data)

    df_clean = df.dropna()
    X = df_clean.drop(columns=['relative_risk_assessment'])
    y = df_clean['relative_risk_assessment']

    # Enforce rule: if _6_spaces == 0 or _7_feces == 0, then risk = 0
    force_zero_condition = (X['_6_spaces'] == 0) | (X['_7_feces'] == 0)
    y[force_zero_condition] = 0  # Overwrite labels where condition is met

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    model = GaussianNB()
    model.fit(X_train, y_train)

    trained_nb_model = model
    feature_columns = list(X.columns)

    y_pred = model.predict(X_test)

    # Metrics
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='weighted', zero_division=0)
    recall = recall_score(y_test, y_pred, average='weighted', zero_division=0)
    f1 = f1_score(y_test, y_pred, average='weighted', zero_division=0)

    return jsonify({
        'Accuracy': round(accuracy, 4),
        'Precision': round(precision, 4),
        'Recall': round(recall, 4),
        'F1 Score': round(f1, 4),

    })

@app.route('/api/top_questions', methods=['GET'])
def top_questions_by_municipality():
    try:
        # Get municipality parameter
        municipality = request.args.get('municipality')
        if not municipality:
            return jsonify({"error": "Municipality parameter is required"}), 400

        # SQL query
        query = """
        SELECT
            municipality,
            SUM(CASE WHEN _1_has_toilet = 'Yes' THEN 1 ELSE 0 END) AS _1_has_toilet,
            SUM(CASE WHEN _2_toilet_used = 'Yes' THEN 1 ELSE 0 END) AS _2_toilet_used,
            SUM(CASE WHEN _3_toilet_functional = 'Yes' THEN 1 ELSE 0 END) AS _3_toilet_functional,
            SUM(CASE WHEN _4_soap = 'Yes' THEN 1 ELSE 0 END) AS _4_soap,
            SUM(CASE WHEN _6_spaces = 'Yes' THEN 1 ELSE 0 END) AS _6_spaces,
            SUM(CASE WHEN _7_feces = 'Yes' THEN 1 ELSE 0 END) AS _7_feces,
            SUM(CASE WHEN _8_composting = 'Yes' THEN 1 ELSE 0 END) AS _8_composting,
            SUM(CASE WHEN _9_dispose = 'Yes' THEN 1 ELSE 0 END) AS _9_dispose,
            SUM(CASE WHEN _10_emptied = 'Yes' THEN 1 WHEN _10_emptied = 'No' THEN 0 END) AS _10_emptied,
            SUM(CASE WHEN _13_sewer = 'Yes' THEN 1 WHEN _13_sewer = 'No' THEN 0 END) AS _13_sewer,
            SUM(CASE WHEN _15_household = 'Yes' THEN 1 WHEN _15_household = 'No' THEN 0 END) AS _15_household,
            SUM(CASE WHEN _16_household = 'Yes' THEN 1 WHEN _16_household = 'No' THEN 0 END) AS _16_household,
            SUM(CASE WHEN _17_using = 'Yes' THEN 1 WHEN _17_using = 'No' THEN 0 END) AS _17_using,
            SUM(CASE WHEN _19_materials = 'Yes' THEN 1 WHEN _19_materials = 'No' THEN 0 END) AS _19_materials
        FROM house_holds
        WHERE municipality = %s
        GROUP BY municipality;
        """

        # Execute query
        connection = get_db_connection()
        data = pd.read_sql_query(query, connection, params=(municipality,))
        print(data)  # Debugging log

        if data.empty:
            return jsonify({"error": f"No data found for municipality: {municipality}"}), 404

        # Process data
        scores = data.iloc[0, 1:].to_dict()  # Skip 'municipality' column
        sorted_scores = sorted(scores.items(), key=lambda x: x[1])  # Sort by score
        top_five_questions = sorted_scores[:14]  # Get top 5 questions

        # Prepare response
        response = {
            "municipality": municipality,
            "top_questions": [
                {"question": question, "score": score} for question, score in top_five_questions
            ]
        }

        return jsonify(response), 200
        # return data_frame_printer(data), 200
        # return query

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if 'connection' in locals():
            connection.close()
    # try:
    #     # Get municipality parameter from the query string
    #     municipality = request.args.get('municipality')
    #     if not municipality:
    #         return jsonify({"error": "Municipality parameter is required"}), 400

    #     # SQL query to fetch aggregated scores for the municipality
    #     query = """
    #     SELECT
    #         municipality,
    #         SUM(CASE WHEN _1_has_toilet = 1 THEN 1 ELSE 0 END) AS _1_has_toilet,
    #         SUM(CASE WHEN _2_toilet_used = 1 THEN 1 ELSE 0 END) AS _2_toilet_used,
    #         SUM(CASE WHEN _3_toilet_functional = 1 THEN 1 ELSE 0 END) AS _3_toilet_functional,
    #         SUM(CASE WHEN _4_soap = 1 THEN 1 ELSE 0 END) AS _4_soap,
    #         SUM(CASE WHEN _6_spaces = 1 THEN 1 ELSE 0 END) AS _6_spaces,
    #         SUM(CASE WHEN _7_feces = 1 THEN 1 ELSE 0 END) AS _7_feces,
    #         SUM(CASE WHEN _8_composting = 1 THEN 1 ELSE 0 END) AS _8_composting,
    #         SUM(CASE WHEN _9_dispose = 1 THEN 1 ELSE 0 END) AS _9_dispose
    #     FROM house_holds
    #     WHERE municipality = %s
    #     GROUP BY municipality;
    #     """

    #     # Execute the query
    #     connection = get_db_connection()
    #     data = pd.read_sql_query(query, connection, params=(municipality,))

    #     if data.empty:
    #         return jsonify({"error": f"No data found for municipality: {municipality}"}), 404

    #     # Transform data to find the lowest scores
    #     scores = data.iloc[0, 1:].to_dict()  # Skip the 'municipality' column
    #     sorted_scores = sorted(scores.items(), key=lambda x: x[1])  # Sort by scores (ascending)
    #     top_five_questions = sorted_scores[:5]  # Get the top 5 questions

    #     # Prepare the response
    #     response = {
    #         "municipality": municipality,
    #         "top_questions": [
    #             {"question": question, "score": score} for question, score in top_five_questions
    #         ]
    #     }

    #     return jsonify(response), 200

    # except Exception as e:
    #     return jsonify({"error": str(e)}), 500
    # finally:
    #     if 'connection' in locals():
    #         connection.close()
@app.route('/train-svm', methods=['GET'])
def train_svm():
    global trained_svm_model, feature_columns

    data = fetch_data()
    df = pd.DataFrame(data)

    df_clean = df.dropna()
    X = df_clean.drop(columns=['relative_risk_assessment'])
    y = df_clean['relative_risk_assessment']

    # Enforce rule: if _6_spaces == 0 or _7_feces == 0, then risk = 0
    force_zero_condition = (X['_6_spaces'] == 0) | (X['_7_feces'] == 0)
    y.loc[force_zero_condition] = 0  # Overwrite labels where condition is met

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    model = SVC(random_state=42)
    model.fit(X_train, y_train)

    trained_svm_model = model
    feature_columns = list(X.columns)  # Save for use in prediction

    y_pred = model.predict(X_test)

    # Metrics
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='weighted', zero_division=0)
    recall = recall_score(y_test, y_pred, average='weighted', zero_division=0)
    f1 = f1_score(y_test, y_pred, average='weighted', zero_division=0)

    return jsonify({
        'Accuracy': round(accuracy, 4),
        'Precision': round(precision, 4),
        'Recall': round(recall, 4),
        'F1 Score': round(f1, 4),
        'Feature Importances': 'N/A (SVM does not support feature importances)'
    })

@app.route('/api/train/random/forest')
def train_random_forest():
    data =rf_kmeans.load_data_frame()
    return data_frame_printer(data)


if __name__ == '__main__':
    app.run(debug=True)


# response = [
#         {
#             "_10_emptied": 0,
#             "_13_sewer": 1,
#             "_15_household": 0,
#             "_16_household": 0,
#             "_17_using": 1,
#             "_19_materials": 1,
#             "_1_has_toilet": 1,
#             "_2_toilet_used": 1,
#             "_3_toilet_functional": 1,
#             "_4_soap": 1,
#             "_6_spaces": 1,
#             "_7_feces": 1,
#             "_8_composting": 1,
#             "_9_dispose": 1,
#             "barangay": "Magnaga, Pantukan",
#             "municipality": "Pantukan",
#             "purok_sitio": "9 KAWAYAN",
#             "relative_risk_assessment": "Basic Sanitation G2",
#             "risk_level": "11"
#         },
#         {
#             "_10_emptied": 1,
#             "_13_sewer": 1,
#             "_15_household": 0,
#             "_16_household": 0,
#             "_17_using": 1,
#             "_19_materials": 1,
#             "_1_has_toilet": 1,
#             "_2_toilet_used": 1,
#             "_3_toilet_functional": 1,
#             "_4_soap": 1,
#             "_6_spaces": 1,
#             "_7_feces": 1,
#             "_8_composting": 1,
#             "_9_dispose": 1,
#             "barangay": "Magnaga, Pantukan",
#             "municipality": "Pantukan",
#             "purok_sitio": "9 KAWAYAN",
#             "relative_risk_assessment": "Basic Sanitation G2",
#             "risk_level": "12"
#         },
#         {
#             "_10_emptied": 1,
#             "_13_sewer": 1,
#             "_15_household": 0,
#             "_16_household": 0,
#             "_17_using": 1,
#             "_19_materials": 1,
#             "_1_has_toilet": 1,
#             "_2_toilet_used": 1,
#             "_3_toilet_functional": 1,
#             "_4_soap": 1,
#             "_6_spaces": 1,
#             "_7_feces": 1,
#             "_8_composting": 1,
#             "_9_dispose": 1,
#             "barangay": "Magnaga, Pantukan",
#             "municipality": "Pantukan",
#             "purok_sitio": "9 KAWAYAN",
#             "relative_risk_assessment": "Safely Managed G3",
#             "risk_level": "13"
#         }
#     ]

# SELECT
#     municipality,
#     SUM(CASE WHEN _1_has_toilet = 'Yes' THEN 1 ELSE 0 END) AS _1_has_toilet,
#     SUM(CASE WHEN _2_toilet_used = 'Yes' THEN 1 ELSE 0 END) AS _2_toilet_used,
#     SUM(CASE WHEN _3_toilet_functional = 'Yes' THEN 1 ELSE 0 END) AS _3_toilet_functional,
#     SUM(CASE WHEN _4_soap = 'Yes' THEN 1 ELSE 0 END) AS _4_soap,
#     SUM(CASE WHEN _6_spaces = 'Yes' THEN 1 ELSE 0 END) AS _6_spaces,
#     SUM(CASE WHEN _7_feces = 'Yes' THEN 1 ELSE 0 END) AS _7_feces,
#     SUM(CASE WHEN _8_composting = 'Yes' THEN 1 ELSE 0 END) AS _8_composting,
#     SUM(CASE WHEN _9_dispose = 'Yes' THEN 1 ELSE 0 END) AS _9_dispose,
#     SUM(CASE WHEN _10_emptied = 'Yes' THEN 1 ELSE 0 END) AS _10_emptied,
#     SUM(CASE WHEN _13_sewer = 'Yes' THEN 1 ELSE 0 END) AS _13_sewer,
#     SUM(CASE WHEN _15_household = 'Yes' THEN 1 ELSE 0 END) AS _15_household,
#     SUM(CASE WHEN _16_household = 'Yes' THEN 0 ELSE 0 END) AS _16_household,
#     SUM(CASE WHEN _17_using = 'Yes' THEN 1 ELSE 0 END) AS _17_using,
#     SUM(CASE WHEN _19_materials = 'Yes' THEN 1 ELSE 0 END) AS _19_materials,
#     -- Compute risk_level as the sum of the relevant columns
#     SUM(
#         CASE WHEN _1_has_toilet = 'Yes' THEN 1 ELSE 0 END +
#         CASE WHEN _2_toilet_used = 'Yes' THEN 1 ELSE 0 END +
#         CASE WHEN _3_toilet_functional = 'Yes' THEN 1 ELSE 0 END +
#         CASE WHEN _4_soap = 'Yes' THEN 1 ELSE 0 END +
#         CASE WHEN _6_spaces = 'Yes' THEN 1 ELSE 0 END +
#         CASE WHEN _7_feces = 'Yes' THEN 1 ELSE 0 END +
#         CASE WHEN _8_composting = 'Yes' THEN 1 ELSE 0 END +
#         CASE WHEN _9_dispose = 'Yes' THEN 1 ELSE 0 END +
#         CASE WHEN _10_emptied = 'Yes' THEN 1 ELSE 0 END +
#         CASE WHEN _13_sewer = 'Yes' THEN 1 ELSE 0 END +
#         CASE WHEN _15_household = 'Yes' THEN 1 ELSE 0 END +
#         CASE WHEN _16_household = 'Yes' THEN 0 ELSE 0 END +
#         CASE WHEN _17_using = 'Yes' THEN 1 ELSE 0 END +
#         CASE WHEN _19_materials = 'Yes' THEN 1 ELSE 0 END
#     ) AS risk_level
# FROM house_holds
