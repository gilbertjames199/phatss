from flask import Flask, request, jsonify
from db import get_db_connection
from python import pretrainer
# from python import train_model
import pandas as pd
import joblib
import numpy as np

def load_data_frame():
    """Fetch all users from the database and return as JSON."""
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        # Define your query
        query = """
        SELECT
            risk_level, relative_risk_assessment, municipality, barangay, purok_sitio,
            CASE
                WHEN municipality = 'Compostela' THEN '01'
                WHEN municipality = 'Laak' THEN '02'
                WHEN municipality = 'Mabini' THEN '03'
                WHEN municipality = 'Maco' THEN '04'
                WHEN municipality = 'Maragusan' THEN '05'
                WHEN municipality = 'Mawab' THEN '06'
                WHEN municipality = 'Monkayo' THEN '07'
                WHEN municipality = 'Montevista' THEN '08'
                WHEN municipality = 'Nabunturan' THEN '09'
                WHEN municipality = 'New Bataan' THEN '10'
                WHEN municipality = 'Pantukan' THEN '11'
                ELSE NULL
            END AS municipality_code,
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
            id < 1000;
        """
        cursor.execute(query)

        # Fetch all rows
        users = cursor.fetchall()  # This should return a list of dictionaries
        # return jsonify(users), 200
        df = pd.DataFrame(users)
        binary_columns = [
            "_1_has_toilet", "_2_toilet_used", "_3_toilet_functional", "_4_soap",
            "_6_spaces", "_7_feces", "_8_composting", "_9_dispose", "_10_emptied",
            "_13_sewer", "_15_household", "_16_household", "_17_using", "_19_materials"
        ]

        # Compute risk level
        df["risk_level"] = df[binary_columns].sum(axis=1)
        return df

    except mysql.connector.Error as err:
        return jsonify({'error': f"Database error: {err}"}), 500

    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'connection' in locals():
            connection.close()

def rf_model_trainer():
    """Train the model"""
    binary_columns = [
        "_1_has_toilet", "_2_toilet_used", "_3_toilet_functional", "_4_soap",
        "_6_spaces", "_7_feces", "_8_composting", "_9_dispose", "_10_emptied",
        "_13_sewer", "_15_household", "_16_household", "_17_using", "_19_materials"
    ]

    # Compute risk level
    df["risk_level"] = df[binary_columns].sum(axis=1)
