from flask import Flask, send_from_directory


# caminho base do projeto (uma pasta acima do backend)
BASE_DIR = os.path.abspat(os.path.join(os.path.dirme(__file__), ".."))

# pasta frontend (html e js)
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

#PASTA STATIC
STATIC_DIR = os.path.join(BASE_DIR, "static")


app = Flask(__name__, static_folder=STATIC_DIR,static_url_path="/"+ STATIC_DIR)


@app.route("/")
def home():
    return "Bom dia galera 2B!"


app.run()
