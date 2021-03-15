import os
import requests

from dotenv import load_dotenv
from flask import Flask, render_template, request, send_file
app = Flask(__name__)

load_dotenv()

API_KEY = os.getenv('API_KEY')
API_URL = ''

# routes

@app.route('/')
def home():
    """Disc"""
    context = {
    }
    return render_template('home.html', **context)

if __name__ == '__main__':
    app.config['ENV'] = 'development'
    app.run(debug=True)