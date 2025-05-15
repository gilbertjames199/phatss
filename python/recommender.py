import joblib
import numpy as np

# Load trained model and label encoder
model = joblib.load('risk_assessment_model.pkl')
label_encoder = joblib.load('label_encoder.pkl')

@app.route('/api/recommendations', methods=['GET'])
def recommend_municipality():
    try:
        connection = get_db_connection()
        query = """
            SELECT municipality,
                   _1_has_toilet, _2_toilet_used, _3_toilet_functional,
                   _4_soap, _5_children, _6_spaces, _7_feces,
                   _8_composting, _9_dispose
            FROM house_holds
        """
        data = pd.read_sql(query, connection)

        # Preprocess and predict
        features = data[['_1_has_toilet', '_2_toilet_used', '_3_toilet_functional',
                         '_4_soap', '_5_children', '_6_spaces', '_7_feces',
                         '_8_composting', '_9_dispose']].fillna(0)
        predictions = model.predict(features)

        # Decode risk levels and aggregate results
        data['predicted_risk_level'] = label_encoder.inverse_transform(predictions)
        summary = data.groupby('municipality')['predicted_risk_level'].apply(
            lambda x: x.value_counts().idxmax()
        ).reset_index(name='recommended_risk_level')

        return jsonify(summary.to_dict(orient='records')), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        connection.close()

if __name__ == '__main__':
    app.run(debug=True)
