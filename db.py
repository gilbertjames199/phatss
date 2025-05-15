import os
import mysql.connector
from dotenv import load_dotenv

# Load environment variables
load_dotenv('.env')

# Database configuration
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
