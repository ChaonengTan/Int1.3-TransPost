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
    mongoPosts = mongo.db.posts.find()
    context = {
        'mongoPosts' : mongoPosts
    }
    return render_template('home.html', **context)
@app.route('/newPost', methods=['GET', 'POST'])
def newPost():
    """Creates a new post"""
    post = {
        'title': request.form.get('newPostTitle'),
        'image': request.form.get('newPostURL'),
        'disc': request.form.get('newPostDisc')
    }
    mongo.db.posts.insert_one(post)
    mongoPosts = mongo.db.posts.find()
    context = {
        'mongoPosts' : mongoPosts
    }
    return render_template('home.html', **context)
@app.route('/posts/<postID>')
def postDetails(postID):
    """Display post along with the details."""
    postInfo = mongo.db.posts.find_one(ObjectId(postID))
    context = {
        'post' : postInfo
    }
    return render_template('postDetails.html', **context)
@app.route('/posts/translate/<postID>', methods=['GET', 'POST'])
def postTranslate(postID):
    """Translates a post"""
    postInfo = mongo.db.posts.find_one(ObjectId(postID))
    source = request.form.get('translateSource')
    target = request.form.get('translateTarget')

    url = "https://google-translate1.p.rapidapi.com/language/translate/v2"
    headers = {
        'content-type': "application/x-www-form-urlencoded",
        'accept-encoding': "application/gzip",
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': "google-translate1.p.rapidapi.com"
        }
    Payload = f"q={postInfo['title']}&q={postInfo['disc']}&source={source}&target={target}"

    titleResponse = requests.request("POST", url, data=Payload, headers=headers)
    dataResponse = json.loads(titleResponse.text)
    translatedPostInfo = {
        'title': dataResponse['data']['translations'][0]['translatedText'],
        'image': postInfo['image'],
        'disc': dataResponse['data']['translations'][1]['translatedText']
    }
    context = {
        'post' : translatedPostInfo
    }
    return render_template('postDetails.html', **context)
if __name__ == '__main__':
    app.config['ENV'] = 'development'
    app.run(debug=True)
    