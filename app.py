import os
import requests
import json

from dotenv import load_dotenv
from flask import Flask, render_template, request, send_file, redirect, url_for
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

app = Flask(__name__)

load_dotenv()

app.config["MONGO_URI"] = os.getenv('mongoURI')
mongo = PyMongo(app)

API_KEY = os.getenv('API_KEY')
API_URL = 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages'

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