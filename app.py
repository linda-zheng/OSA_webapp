import os

from flask import Flask, render_template, jsonify
import requests
import json

url = "http://flaskosa.herokuapp.com/cmd/"
headers = {
    'content-type': "application/json",
    'x-apikey': "560bd47058e7ab1b2648f4e7",
    'cache-control': "no-cache"
    }

app = Flask(__name__)

# initial page
@app.route('/')
def hello_world():
    title = "OSA"
    name = "Welcome to cloud OSA!"
    return render_template('index.html', title=title, name=name)

# the following 3 routes are used for the live graph
@app.route('/api/start')
def start():
    res = requests.request("GET", url + 'START', headers=headers)
    return "started..."

@app.route('/api/stop')
def stop():
    res = requests.request("GET", url + 'STOP', headers=headers)
    return "stopped..."

@app.route('/api/trace')
def trace():
    return jsonify(requests.request("GET", url + 'TRACE', headers=headers).json())

# the routes below are used for the query portion on the bottom half of the page
# they can also be accessed by directly visiting localhost:8080/api/cmd or another desired route
@app.route('/api/cmd')
def cmd():
    return requests.request("GET", "http://flaskosa.herokuapp.com/cmd", headers=headers).text

@app.route('/api/cmd/<section>')
def query(section):
    return requests.request("GET", url + section.upper(), headers=headers).text

@app.route('/api/cmd/ECHO/<section>')
def echo(section):
    return requests.request("GET", url + "ECHO/" + section, headers=headers).text

@app.route('/api/cmd/LIM/<s1>/<s2>')
def limset(s1, s2):
    return requests.request("GET", url + "LIM/[%s,%s]"%(s1, s2), headers=headers).text
    
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
