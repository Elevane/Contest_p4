from flask import Flask, request, jsonify, render_template
import json
import os
from datetime import datetime, date



# Init app
app = Flask(__name__)

if not os.path.isfile("data.json"):
     with open('data.json', 'w') as json_file:
         json_file.write("[]")

if os.stat("data.json").st_size == 0:
    with open('data.json', 'w') as json_file:
         json_file.write("[]")

@app.route('/')
def acceuil():
    return  render_template('Acceuil.html')

@app.route('/jeu')
def jeu():
    return  render_template('jeu.html')

@app.route('/scores')
def score():
    scores = return_scores()
    return  render_template('score.html', scores=scores)

@app.route('/credits')
def credits():
    return  render_template('credits.html')


## retourne la liste des scores trié
def return_scores():
    with open('data.json') as json_file:
        scores = []
        data = json.load(json_file)
        for s in data:
            scores.append(s)
    
    sortedScores = sorted(scores, key=lambda x : x['score'], reverse = True)
    return sortedScores


def add_scores(name):
    with open('data.json') as json_file:
        data = json.load(json_file)
        if os.path.isfile("temp.json"):
            os.remove("temp.json")
        with open('temp.json', "w") as json_temp_file:
            json_temp_file.write("[")
            if exist(name):
                for s in data:
                    if s['name'] == name:
                        score = int(s['score'])
                        sv = score + 1
                        json.dump({'name' : s['name'], 'score': sv}, json_temp_file)
                        if s != data[-1]:
                            json_temp_file.write(",")
                    else :
                        json.dump(s, json_temp_file)
                        if s != data[-1]:
                            json_temp_file.write(",")
            else:
                for s in data:
                    json.dump(s, json_temp_file)
                    json_temp_file.write(",")
                json.dump({'name' : name, 'score': 1} , json_temp_file)
                    
            json_temp_file.write("]")
    json_file.close()
    json_temp_file.close()

    if os.path.isfile("data.json"):
        os.remove("data.json")
    if os.path.isfile("temp.json"):
        os.rename("temp.json", "data.json")
        
    return return_scores()


#check if the player exist based on his name
def exist(name):
    if os.path.isfile("data.json"):
        with open('data.json') as jsonfile:
            data = json.load(jsonfile)
            for d in data:
                if d['name'] == name:
                    return True
    else :
        return False
    return False


if __name__ == '__main__':
    app.run(debug=True)