from flask import Flask
app = Flask(_name_)

@app.route("/")
def home():
    return "bom dia galera 2B!"

app.run()
