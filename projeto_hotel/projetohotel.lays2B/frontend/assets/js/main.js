// Espera quando o HTML carregar completamente antes de executar o JavaScript
document.addEventListener("DOMContentLoaded", function() {
    // alert("JS carregou!")

    // Aqui estamos pegando o formulário pelo ID
    const Cadastroformulario = document.getElementById("Cadastroformulario");

    if (Cadastroformulario) {
        Cadastroformulario.addEventListener("submit", async (e) => {
            // Bloqueia o recarregamento padrão
            e.preventDefault();
    
            // Cria um objeto completo com todos os dados
            // 1) new FormData(formCadastro) -> pega todos os campos do formulário
            // 2) Object.fromEntries -> tranformas os dados em um objeto
            const dados = Object.fromEntries(
                new FormData(Cadastroformulario)
            );

            try {
                const resp = await fetch('/cadastrar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados)
                });

                // Recebe a resposta do Flask (JSON)
                const result = await resp.json()
                
                // Exibe a mensagem de retorno para o usuário
                msg = document.getElementById('mensagem');

                // Limpa as classes de cor anteriores para não haver conflito
                msg.classList.remove("red-error", "green-correct");

                if (result.message.includes("Todos os campos")) {
                    msg.classList.add("red-error");
                    msg.innerText = result.message;
                } else if (result.message.includes("Cliente cadastrado")) {
                    msg.classList.add("green-sucess");
                    msg.innerText = result.message;
                }

                // Limpa os campos após o envio
                Cadastroformulario.reset();
            }
            catch (erro) {
                // Caso algo dê errado (servidor fora do ar, etc...)
                    ("Erro de comunicação com o servidor: " + erro)
            }

            // Agora vamos mostrar os dados no Console
            console.log("Dados capturados:");
            // Mostra o campo nome
            console.log("nome: ", dados.nome);
            // Mostra o campo email
            console.log("email: ", dados.email);
            // Mostra o campo telefone
            console.log("Telefone: ", dados.telefone);
            // Mostra o objeto completo com todos os dados
            console.log(dados);
        })
    }

    const btnBuscar = document.getElementById("btnBuscar");

    if (btnBuscar) {
        btnBuscar.addEventListener("click", async () => {
            // Pega o nome digitado pelo usuário
            const nome = document.getElementById("campoBusca").value;

            // Fa uma requisição GET ao Flask, enviando o nome como parâmetro
            const resp = await fetch(`/buscar?nome=${nome}`);
            const clientes = await resp.json(); // Recebe a lista de clientes

            const tabela = document.getElementById("tabelaResultados");
            tabela.innerText = ""; // Limpa a tabela antes de mostrar os resultados

            // Para cada cliete retornado, cria uma nova linha na tabela HTML
            clientes.forEach(cli => {
                const row = `
                <tr class="ctn-clientes">
                    <td>${cli.ID}</td>
                    <td>${cli.nome}</td>
                    <td>${cli.CPF}</td>
                    <td>${cli.email}</td>
                    <td>${cli.Telefone}</td>
                    <td><a href="/alterar?id=${cli.ID}" class="btn btn-sm btn-warning">Editar</a></td>
                <tr>`;
                tabela.innerHTML += row; // Adiciona a nova linha na tabela
            })
        })
    }
 
     // -----------------------------------------
      //Alterar clientes
     // -------------------------------------------

     //Essa parte roda na página alterar.html
     const formAlterar = document.getElementById('formAlterar');

     if (formAlterar) {
        // Caputura o ID do cliente a partir da URL (ex:/alterar?id=3)
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        const mensagem = document.getElementById('mensagem');

        // -----------------------------------------
        // AO carregar a página, busca os dados do cliente no backend
        // -----------------------------------------
        fetch(`/api/cliente/${id}`)
            .then(r => r.json())
            .then(cli => {
                // Preenche automaticamente os campos do formulário
                document.getElementById('clienteId').value = cli.ID;
                document.getElementById('nome').value = cli.Nome;
                document.getElementById('CPF').value = cli.CPF;
                document.getElementById('email').value = cli.Email;
                document.getElementById('Telefone').value = cli.Telefone;
                document.getElementById('endereço').value = cli.Endereço;
                document.getElementById('Observações').value = cli.Observações;
            });
        
     }
    // ------------------------------------------
    // Envio das alterações ao servidor
    // ------------------------------------------
    formAlterar.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Monta um objeto com os dados digitados
        const dados = {
            nome: nome.value,
            CPF: CPF.value,
            email: email.value,
            Telefone: Telefone.value,
            endereco: endereço.value,
            Observações: Observações.value
        };

        // Envia para o backend (rota /api/atualizar/<id>)
        const resp = await fetch(`/api/atualizar/${id}`, {
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        const result = await resp.json();
        mensagem.innerHTML = result.message; // Mostra o retorno na tela
    })
})