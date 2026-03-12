import os
from flask import Flask, send_from_directory
import openpyxl
from datetime import (
   datetime,
)
app = Flask(__name__)


# caminho base do projeto (uma pasta acima do backend)
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

# pasta frontend (html e js)
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

#PASTA STATIC
STATIC_DIR = os.path.join(BASE_DIR, "static")

DB_DIR = os.path.join (os.path.dirname(__file__), "..", "db")
EXCEL_FILE = os.path.join (DB_DIR, "clienteS.xlSx")

COLUMNS = [
    "ID",
    "Nome",
    "CPF",
    "Email",
    "Telefone",
    "Endereço",
    "Observações",
    "Data Cadastro",

]

def init_excel():
    if not os.path.exists(DB_DIR):
       os.makedirs(DB_DIR)

    if not os.path.exists(EXCEL_FILE):
       workbook = openpyxl.Workbook()
       sheet = workbook.active
       sheet.title = "Clientes"
       sheet.append(COLUMNS)
       workbook.save(EXCEL_FILE)

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
