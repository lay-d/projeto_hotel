import os
from flask import Flask, send_from_directory
import openpyxl  # 📊 Biblioteca para ler e escrever planilhas Excel (.xlsx)
from datetime import (
    datetime,
)  # ⏰ Para registrar a data de cada cadastro automaticamente


# Caminho base do projeto (uma pasta acima do backend)
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

# Pasta frontend (HTML e JS)
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

# Pasta static (CSS)
STATIC_DIR = os.path.join(BASE_DIR, "static")

# 💾 Aqui definimos os diretórios e o nome do arquivo Excel que servirá de banco.
# =============================================================================
DB_DIR = os.path.join(os.path.dirname(__file__), "..", "db")  # Pasta onde ficará o banco de dados
EXCEL_FILE = os.path.join(DB_DIR, "clientes.xlsx") 

# Cabeçalhos das colunas do Excel (linha 1)
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

# =============================================================================
# 🛠 FUNÇÃO AUXILIAR: CRIA O ARQUIVO EXCEL CASO NÃO EXISTA
# =============================================================================
# 💡 Essa função garante que o sistema funcione mesmo na primeira execução.
#    Se a pasta 'db' ou o arquivo 'clientes.xlsx' não existirem, eles são criados.
# =============================================================================
def init_excel():
    if not os.path.exists(DB_DIR):
        os.makedirs(DB_DIR)  # 🧱 Cria a pasta db se ainda não existir

    if not os.path.exists(EXCEL_FILE):
        workbook = openpyxl.Workbook()  # 📗 Cria uma nova planilha Excel
        sheet = workbook.active  # Pega a planilha ativa
        sheet.title = "Clientes"  # Nomeia a aba principal
        sheet.append(COLUMNS)  # Adiciona os títulos das colunas
        workbook.save(EXCEL_FILE)  # Salva o arquivo Excel


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



if __name__ == "__main__":
    print("BASE_DIR:", BASE_DIR)
    print("FRONTEND_DIR:", FRONTEND_DIR)
    print("STATIC_DIR:", STATIC_DIR)
    app.run(debug=True)
