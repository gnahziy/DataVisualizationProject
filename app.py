from flask import Flask, render_template, send_file

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/index2')
def index2():
    return render_template('index2.html')

@app.route('/readjson')
def read_json():
    return send_file('static/json/fuel_stationDB.json')

if __name__ == '__main__':
    app.run(debug=True, port=50091)

    






