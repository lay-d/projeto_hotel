document.addEventListener("DOMContentLoaded", function() {

    const formCadastro = document.getElementById("formCadastro");
    if (formCadastro) {
        formCadastro.addEventListener("submit", async (e) => {
            e.preventDefault();
            const dados = Object.fromEntries(new FormData(formCadastro));
            try {
                const resp = await fetch("/cadastrar", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(dados)
                });
                const result = await resp.json();
                const msg = document.getElementById("mensagem");
                msg.className = "";
                msg.innerText = result.message;
                if (resp.ok) msg.classList.add("green-success");
                else msg.classList.add("red-error");
                formCadastro.reset();
            } catch (erro) {
                console.error("Erro:", erro);
            }
        });
    }

    const btnBuscar = document.getElementById("btnBuscar");
    if (btnBuscar) {
        btnBuscar.addEventListener("click", async () => {
            const nome = document.getElementById("campoBusca").value;
            const resp = await fetch(`/buscar?nome=${nome}`);
            const clientes = await resp.json();
            const tabela = document.getElementById("tabelaResultados");
            tabela.innerHTML = "";
            clientes.forEach(cli => {
                const row = `
                <tr>
                    <td>${cli.ID}</td>
                    <td>${cli.nome}</td>
                    <td>${cli.CPF}</td>
                    <td>${cli.email}</td>
                    <td>${cli.Telefone}</td>
                    <td>${cli.endereco}</td>
                    <td><a href="/alterar?id=${cli.ID}" class="btn-warning">Editar</a></td>
                </tr>`;
                tabela.innerHTML += row;
            });
        });
    }

    const formAlterar = document.getElementById("formAlterar");
    if (formAlterar) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        if (id) {
            fetch(`/api/cliente/${id}`)
                .then(r => r.json())
                .then(cli => {
                    document.getElementById("clienteId").value = cli.ID;
                    document.getElementById("nome").value = cli.nome;
                    document.getElementById("CPF").value = cli.CPF;
                    document.getElementById("email").value = cli.email;
                    document.getElementById("Telefone").value = cli.Telefone;
                    document.getElementById("endereco").value = cli.endereco;
                    document.getElementById("observacoes").value = cli.observacoes;
                });
        }

        formAlterar.addEventListener("submit", async (e) => {
            e.preventDefault();
            const dados = {
                nome: document.getElementById("nome").value,
                CPF: document.getElementById("CPF").value,
                email: document.getElementById("email").value,
                Telefone: document.getElementById("Telefone").value,
                endereco: document.getElementById("endereco").value,
                observacoes: document.getElementById("observacoes").value
            };
            const resp = await fetch(`/api/atualizar/${id}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(dados)
            });
            const result = await resp.json();
            document.getElementById("mensagem").innerText = result.message;
        });
    }

});