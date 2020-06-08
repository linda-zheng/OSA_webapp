# OSA Webapp

1. clone repo
2. if you do not have pip installed, follow the installation instructions [here](https://pip.pypa.io/en/stable/installing/)
3. install the necessary requirements by running the following command: ```pip install -r requirements.txt```
4. run ```python app.py```
5. visit localhost:8080
6. alternatively you can run the following set of commands for Unix and visit localhost:5000
```
export FLASK_APP=run.py
flask run 
```


## Things to watch out for

- If you are making any changes or restarting the app, make sure to clear your browser's cache. On windows, you can use ```ctrl-shift-r``` to refresh the page and clear the cache.
- There are alerts to help you debug. Whenever a faulty trace is received, an error alert should appear on your screen. Simply click ```ok``` and resume using the app.
- Sometimes the retrieving the trace can take a while and cause delays. If this happens, wait for the traces to return before trying new commands. In the odd case that the traces are not being retrieved, try to refresh your page.

## Final thoughts

This webapp was made over the course of a weekend. It was an interesting challenge. I had the opportunity to tryout a framework (Flask) that I've never used before. I also played around with the CanvasJS library. Some cool features include the ability to read values from the plot and selecting portions of the graph to zoom into. Finally, a version of this webapp has been deployed to heroku; you can find it [here](https://osa-webapp.herokuapp.com/).