import os
from flask import Flask, send_from_directory


# caminho base do projeto (uma pasta acima do backend)
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

# pasta frontend (html e js)
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

#PASTA STATIC
STATIC_DIR = os.path.join(BASE_DIR, "static")


app = Flask(__name__, static_folder=STATIC_DIR,static_url_path="/"+ STATIC_DIR)

# =================================

# ROTA PRINCIPAL (HTML)
#ROTAS DA PAGINA
#Pagina inicial
# ================================

@app.route("/")
def home():
    return send_from_directory(FRONTEND_DIR,"index.html")


#
@app.route("/consulta")
def consultar_page():
    return send_from_directory(FRONTEND_DIR, "consulta.html")


#
@app.route("/alterar")
def alterar_page():
    return send_from_directory(FRONTEND_DIR, "alterar.html")

app.run()
