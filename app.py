import os
import matplotlib as mpl
if os.environ.get('DISPLAY','') == '':
    print('no display found. Using non-interactive Agg backend')
    mpl.use('Agg')
import matplotlib.pyplot as plt

from flask import Flask, render_template, jsonify
import requests
import json

import numpy as np
url = "http://flaskosa.herokuapp.com/cmd/"
headers = {
    'content-type': "application/json",
    'x-apikey': "560bd47058e7ab1b2648f4e7",
    'cache-control': "no-cache"
    }

app = Flask(__name__)

@app.route('/')
def hello_world():
    title = "OSA trace"
    name = "Hello Linda!"
    return render_template('test.html', title=title, name=name)

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
    response = requests.request("GET", url + 'TRACE', headers=headers)
    res1 = response.json()
    #print(res1)
    res = res1['ydata']
    #print(len(res))
    response = requests.request("GET", url + 'LIM', headers=headers)
    W1 = int(response.text[8:12])
    W2 = int(response.text[14:18])
    WW = np.linspace(W1, W2, len(res))
    plt.plot(WW, res)
    plt.axis([W1, W2, round(min(res))-5, round(max(res))+5])
    plt.grid(True)
    plt.xlabel('Wavelength [nm]')
    plt.ylabel('Mag [dBm]')
    plt.savefig('./static/img/test1.png')
    plt.clf()
    return 'got trace'
    
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
