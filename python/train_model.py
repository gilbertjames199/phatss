from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib                                        # For saving the model and encoder
import pandas as pd  # If you're working with pandas DataFrames
import numpy as np   # If you're using NumPy array

def train_model(X_train, y_train):
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    return model


