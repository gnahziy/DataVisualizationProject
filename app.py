from flask import Flask, render_template, send_file

app = Flask(__name__)

@app.route("/")
def welcome():
    """List all available page"""
    return (
        f"Welcome to our Alternative Fuels Dashboard<br/>"
        f"To navigate this web app please append the available paths to the URL<br/>"
        f"Available URLs:<br/>"
        f"For the view of our interactive map append '/index'<br/>"
        f"For our interactive charts append '/index2'"
    )

@app.route('/index')
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

    






