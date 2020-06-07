from flask import Flask, render_template, jsonify
import pandas as pd
import matplotlib.pyplot as plt
import requests
import json
import time
import numpy as np
import matplotlib.pyplot as plt
#from PIL import Image

url = "http://flaskosa.herokuapp.com/cmd/"
headers = {
    'content-type': "application/json",
    'x-apikey': "560bd47058e7ab1b2648f4e7",
    'cache-control': "no-cache"
    }


app = Flask(__name__)


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/about")
def about():
    #return render_template("about.html")
    #response1 = requests.request("GET", url + 'LIM/[1530, 1565]', headers=headers)
    #time.sleep(1)
    response1 = requests.request("GET", url + 'LIM/[1520, 1575]', headers=headers)
    response2 = requests.request("GET", url + 'IDN', headers=headers)
    return jsonify(response1.text + response2.text)

if __name__ == "__main__":
    #s = pd.Series([1, 2, 3])
    #fig, ax = plt.subplots()
    #s.plot.bar()
    #fig.savefig('my_plot.png')
    #response = requests.request("GET", url + 'LIM', headers=headers)
    #aa = int(response.text)
    response = requests.request("GET", url + 'TRACE', headers=headers)
    res1 = response.json()
    res = res1['ydata']
    print(len(res))
    response = requests.request("GET", url + 'LIM', headers=headers)
    W1 = int(response.text[8:12])
    W2 = int(response.text[14:18])
    WW = np.linspace(W1, W2, len(res))
    plt.plot(WW, res)
    plt.axis([W1, W2, round(min(res))-5, round(max(res))+5])
    plt.grid(True)
    plt.xlabel('Wavelength [nm]')
    plt.ylabel('Mag [dBm]')
    plt.savefig('test1.png')
    # img = Image.open('test1.png')
    # img.show()
    # plt.close()
    app.run(debug=True)

   # < link
   # rel = "stylesheet"
   # href = "{{ url_for('static',    filename='css/template.css') }}" >
