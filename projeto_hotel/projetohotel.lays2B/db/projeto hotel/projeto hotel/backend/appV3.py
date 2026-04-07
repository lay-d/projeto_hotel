import os
from flask import Flask, send_from_directory


# Pasta onde ficará o banco de dados

DB_DIR = os.path.join(os.path.dirname(__file__), "..", "db")

# Caminho completo do arquivo Excel

EXCEL_FILE = os.path.join(DB_DIR, "clientes.xlsx")

# Caminho base do projeto (uma pasta acima do backend)
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

# Pasta frontend (HTML e JS)
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

# Pasta static (CSS)
STATIC_DIR = os.path.join(BASE_DIR, "static")

# app = Flask(__name__)
app = Flask(__name__, static_folder=STATIC_DIR, static_url_path="/" + STATIC_DIR)


# =========================
# ROTA PRINCIPAL (HTML)
# ROTAS DAS PÁGINAS (FRONTEND)
# Página inicial (Cadastro/index.html)
# =========================
@app.route("/")
def home():
    return send_from_directory(FRONTEND_DIR, "index.html")


# Página de Consulta
@app.route("/consulta")
def consulta_page():
    return send_from_directory(FRONTEND_DIR, "consulta.html")


# Página de Alteração
@app.route("/alterar")
def alterar_page():
    return send_from_directory(FRONTEND_DIR, "alterar.html")


# =========================
# SERVIR ARQUIVOS DA PASTA FRONTEND (ex: assets/js)
# =========================
@app.route("/assets/<path:filename>")
def assets_files(filename):
    return send_from_directory(os.path.join(FRONTEND_DIR, "assets"), filename)


# =========================
# SERVIR ARQUIVOS DA PASTA STATIC (ex: css)
# =========================
@app.route("/static/<path:filename>")
def static_files(filename):
    return send_from_directory(STATIC_DIR, filename)


if __name__ == "__main__":
    print("BASE_DIR:", BASE_DIR)
    print("FRONTEND_DIR:", FRONTEND_DIR)
    print("STATIC_DIR:", STATIC_DIR)
    app.run(debug=True)
