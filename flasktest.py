from flask import Flask, render_template, jsonify
import dbinterface as db
from pprint import pprint

app = Flask(__name__)
dbinterface = db.DBInterface()

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/records")
def records():
    records = dbinterface.get_records()
    count = len(records)
    return jsonify(records=records, queryRecordCount=count, totalRecordCount=count)


if __name__ == "__main__":
    app.run()
    # Bootstrap(app)
