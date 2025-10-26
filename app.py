from flask import Flask, request, render_template, redirect, url_for, flash, session
import mysql.connector
from flask_bcrypt import Bcrypt
from functools import wraps 
from flask_mail import Mail, Message
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
import os

app = Flask(__name__)

app.secret_key = os.environ.get('SECRET_KEY', 'sohel_siddiqui')

db_config = {
    'host': os.environ.get('DB_HOST','127.0.0.1'),
    'user': os.environ.get('DB_USER','root'),
    'password': os.environ.get('DB_PASSWORD','Sohel@123'),
    'database': os.environ.get('DB_NAME','gym')
}

@app.route('/submission',methods=['GET','POST'])
def submission():
    if request.method=='POST':
        email = request.form['email']
        name=request.form['name']
        massege = request.form['massege']
        subject = request.form['subject']

        cnx = mysql.connector.connect(**db_config)
        cursor = cnx.cursor(dictionary=True)
        cursor.execute('INSERT INTO users (email, name, subject, massege) VALUES (%s, %s, %s, %s )', (email, name, subject, massege))
        cnx.commit()
        cursor.close()
        cnx.close()
        flash('Your data has been send sucessfully.', 'success')
        return redirect(url_for('home'))
    return render_template('contact.html')

@app.route('/')
def home():
    return render_template('index.html') 


@app.route('/about')
def about():
    # About route ab 'about' naam se jaana jaayega
    return render_template('about.html')

@app.route('/courses')
def courses():
    return render_template('courses.html')

@app.route('/pricing')
def pricing():
    return render_template('pricing.html')

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')
if __name__ == '__main__':
    app.run(debug=True, port=5000)

