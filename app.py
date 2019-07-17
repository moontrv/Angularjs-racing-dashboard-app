import os.path
import json
from flask import Flask
from flask import jsonify
from random import randrange

SRC_DIR = os.path.abspath(os.path.dirname(__file__))
DATA_DIR = os.path.join(SRC_DIR, 'data')

app = Flask(__name__)


@app.route('/')
# @app.route('/driver-list')
def home():
    return app.send_static_file('index.html')


@app.route('/api/standings.json')
def standings():
    f = open("data/drivers.json", "r")
    json_obj = json.loads(f.read())
    rand_index = randrange(10)
    json_obj[rand_index]['points'] += 1
    f_w = open("data/drivers.json", "w")
    f_w.write(json.dumps(json_obj, ensure_ascii=False))
    f_w.close()

    # Reread new file
    f_n = open("data/drivers.json", "r")
    json_obj_n = json.loads(f_n.read())

    def extract_point(json):
        try:
            return int(json['points'])
        except KeyError:
            return 0
    json_obj_n.sort(key=extract_point, reverse=True)
    rank = 1
    for i in range(len(json_obj_n)-1):
        print(json_obj_n[i])
        json_obj_n[i]['rank'] = rank
        if json_obj_n[i]['points'] != json_obj_n[i+1]['points']:
            rank = rank+1
    json_obj_n[len(json_obj_n)-1]['rank'] = rank
    return jsonify(json_obj_n)


@app.route('/api/team/<int:team_id>.json')
def team_details(team_id):
    f = open("data/teams.json", "r")
    #k = jsonify(json.loads(f.read()))
    json_obj = json.loads(f.read())
    for x in json_obj:
        if x['id'] == team_id:
            return x
    return "Not available"


if __name__ == '__main__':
    app.run(debug=True)
