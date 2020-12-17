from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy 

import os
from datetime import datetime, date



# Init app
app = Flask(__name__)

basedir = os.path.abspath(os.path.dirname(__file__))
# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Init db
db = SQLAlchemy(app)
# Init ma


@app.route('/')
def hello_world():
    return  render_template('Acceuil.html')




if __name__ == '__main__':
    app.run(debug=True)