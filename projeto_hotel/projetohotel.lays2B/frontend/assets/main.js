document.addEventListener("DOMContentLoaded", function () {


    const formCadastro = document.getElementById("formCadastro");

    formCadastro.addEventListener("subimit", function (e) {

         e.preventDefault();


         const dados = Object.fromEntries(
            new FormData(formCadastro)
         );


        console.log("Dados capturados:")

        console.log("Nome:", dados.nome);

        console.log("Email:", dados.email);
        
        console.log("Telefone:", dados.telefone);

        console.log(dados);

    });
});