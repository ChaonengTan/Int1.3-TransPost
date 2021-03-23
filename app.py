import os
import requests
import json
import secrets

from dotenv import load_dotenv
from flask import Flask, render_template, request, send_file, redirect, url_for, session
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

app = Flask(__name__)
secret_key = secrets.token_hex(16)
app.config['SECRET_KEY'] = secret_key
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
    if 'user' in session:
        user = session['user']
        context['user'] = user
    return render_template('home.html', **context)
@app.route('/newPost', methods=['POST'])
def newPost():
    """Creates a new post"""
    post = {
        'author': session['user'],
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
    if 'user' in session:
        user = session['user']
        context['user'] = user
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
        'author': postInfo['author'],
        'title': dataResponse['data']['translations'][0]['translatedText'],
        'image': postInfo['image'],
        'disc': dataResponse['data']['translations'][1]['translatedText']
    }
    context = {
        'post' : translatedPostInfo
    }
    return render_template('postDetails.html', **context)
@app.route('/register', methods=['POST'])
def register():
    """Registers a user"""
    password = request.form.get('registerPassword')
    checkPass = request.form.get('registerPasswordCheck')
    mongoPosts = mongo.db.posts.find()
    if (password == checkPass):
        user = {
            'username': request.form.get('registerName'),
            'password': password
        }
        if mongo.db.users.find_one(user):
            context = {
                'mongoPosts' : mongoPosts,
                'userExists' : True
            }
            return render_template('home.html', **context)
        mongo.db.users.insert_one(user)
        targetUser = mongo.db.users.find_one(user)
        createSession(targetUser)
        return redirect(url_for('home'))
    else:
        context = {
            'mongoPosts' : mongoPosts,
            'badPassword' : True
        }
        return render_template('home.html', **context)
@app.route('/signin', methods=['POST'])
def signIn():
    """Sign ins a user"""
    mongoPosts = mongo.db.posts.find()
    user = {
        'username': request.form.get('signinName'),
        'password': request.form.get('signinPassword')
    }
    targetUser = mongo.db.users.find_one(user)
    if not targetUser:
        context = {
            'mongoPosts' : mongoPosts,
            'badLogin' : True
        }
        return render_template('home.html', **context)
    createSession(targetUser)
    return redirect(url_for('home'))
@app.route('/logout')
def logout():
    """Sign out the user"""
    session.pop('user', None)
    return redirect(url_for('home'))
def createSession(user):
    newSessionContext = {
        '_id': str(user['_id']),
        'username': user['username']
    }
    session['user'] = newSessionContext
@app.route('/profile/<userID>')
def profile(userID):
    """Profile Page"""
    userProfile = mongo.db.users.find_one(ObjectId(userID))
    userProfileID = userProfile['_id']
    newUserProfile = {
        '_id': f'{userProfileID}',
        'username': userProfile['username']
    }
    userPosts = mongo.db.posts.find({'author': newUserProfile})
    context = {
        'profile' : userProfile,
        'userPosts' : userPosts
    }
    if 'user' in session:
        user = session['user']
        context['user'] = user
    return render_template('profile.html', **context)
if __name__ == '__main__':
    app.config['ENV'] = 'development'
    app.run(debug=True)
    # app.run(threaded=True, port=5000)