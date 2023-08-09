from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return app.send_static_file('js/index.html')  # Serve index.html from the static/js folder

if __name__ == '__main__':
    app.run(debug=True, port=50091)
    







