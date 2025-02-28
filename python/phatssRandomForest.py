import pandas as pd
import numpy as np
import joblib
from flask import Flask

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

app = Flask(__name__)

@app.route('/api/recommendations/random/forest', methods=['GET'])
def random_forest_demo():
    return "Random forest demo"
    # try:
    #     connection = get_db_connection()
    #     query = """
    #         SELECT
    #             id,
    #             (CASE WHEN _1_has_toilet = 'Yes' THEN 1 ELSE 0 END) AS _1_has_toilet,
    #             (CASE WHEN _2_toilet_used = 'Yes' THEN 1 ELSE 0 END) AS _2_toilet_used,
    #             (CASE WHEN _3_toilet_functional = 'Yes' THEN 1 ELSE 0 END) AS _3_toilet_functional,
    #             (CASE WHEN _4_soap = 'Yes' THEN 1 ELSE 0 END) AS _4_soap,
    #             (CASE WHEN _6_spaces = 'Yes' THEN 1 ELSE 0 END) AS _6_spaces,
    #             (CASE WHEN _7_feces = 'Yes' THEN 1 ELSE 0 END) AS _7_feces,
    #             (CASE WHEN _8_composting = 'Yes' THEN 1 ELSE 0 END) AS _8_composting,
    #             (CASE WHEN _9_dispose = 'Yes' THEN 1 ELSE 0 END) AS _9_dispose,
    #             (CASE WHEN _10_emptied = 'Yes' THEN 1 WHEN _10_emptied = 'No' THEN 0 END) AS _10_emptied,
    #             (CASE WHEN _13_sewer = 'Yes' THEN 1 WHEN _13_sewer = 'No' THEN 0 END) AS _13_sewer,
    #             (CASE WHEN _15_household = 'Yes' THEN 1 WHEN _15_household = 'No' THEN 0 END) AS _15_household,
    #             (CASE WHEN _16_household = 'Yes' THEN 0 WHEN _16_household = 'No' THEN 0 END) AS _16_household,
    #             (CASE WHEN _17_using = 'Yes' THEN 1 WHEN _17_using = 'No' THEN 0 END) AS _17_using,
    #             (CASE WHEN _19_materials = 'Yes' THEN 1 WHEN _19_materials = 'No' THEN 0 END) AS _19_materials,
    #         (CASE WHEN relative_risk_assessment='Open Defecation G0' THEN 0
    #         WHEN relative_risk_assessment="Zero Open Defecation G1" THEN 0
    #         WHEN relative_risk_assessment="Basic Sanitation G2" THEN 1
    #         WHEN relative_risk_assessment="Safely Managed G3" THEN 1 END) AS relative_risk_assessment
    #         FROM house_holds
    #     """
    #     df = pd.read_sql(query, connection)
    #     connection.close()

    #     # Compute dependent variable
    #     df["relative_risk_assessment"] = df.iloc[:, :15].sum(axis=1)
    #     df["relative_risk_assessment"] = np.where(df["relative_risk_assessment"] > 11, 1, 0)
    #     df["relative_risk_assessment"] = np.where((df["_6_spaces"] == 0) | (df["_7_feces"] == 0), 0, df["relative_risk_assessment"])

    #     # Split data
    #     X = df.iloc[:, :-1]
    #     y = df["relative_risk_assessment"]
    #     X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    #     # Train model
    #     rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
    #     rf_model.fit(X_train, y_train)

    #     # Evaluate model
    #     y_pred = rf_model.predict(X_test)
    #     print(f"Model Accuracy: {accuracy_score(y_test, y_pred):.2f}")

    #     # Save the trained model
    #     joblib.dump(rf_model, "risk_assessment_rf.pkl")

    #     # Simulate four random surveys
    #     for i in range(1, 5):
    #         random_survey = np.random.randint(0, 2, size=(1, X.shape[1]))
    #         forecasted_risk = rf_model.predict(random_survey)[0]
    #         print(f"Survey {i}: {tuple(random_survey[0])} forecasted relative risk assessment: {forecasted_risk}")
    # except Exception as e:
    #     return jsonify({'error': str(e)}), 500
    # finally:
    #     connection.close()
