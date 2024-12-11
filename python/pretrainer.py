from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

def preprocess_data(data):
    # Drop rows with missing target (risk_level)
    if 'risk_level' not in data.columns:
        raise ValueError("The 'risk_level' column is missing from the data")
    data = data.dropna(subset=['risk_level'])

    # Encode target variable (risk_level)
    le = LabelEncoder()
    data['risk_level_encoded'] = le.fit_transform(data['risk_level'])

    # Feature selection
    features = ['_1_has_toilet', '_2_toilet_used', '_3_toilet_functional',
                '_4_soap',  '_6_spaces', '_7_feces',
                '_8_composting', '_9_dispose']
    X = data[features]
    y = data['risk_level_encoded']

    # Handle missing values
    X = X.fillna(X.median())

    # Split data into train and test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    return X_train, X_test, y_train, y_test, le

    # return data
