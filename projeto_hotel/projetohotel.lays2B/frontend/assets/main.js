document.addEventListener("DOMContentLoaded", function () {


    const formCadastro = document.getElementById("formCadastro");

    if (formCadastro) {

    formCadastro.addEventListener("subimit", async (e) => {

        const resp = await fetch ('/api/cadastrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)

            })
        
        
        e.preventDefault();


         const dados = Object.fromEntries(
            new FormData(formCadastro)
         );

         try{


         } catch (err){

              alert('Erro de comunicação com o servidor: ' + err);
         }

        console.log("Dados capturados:")

        console.log("Nome:", dados.nome);

        console.log("Email:", dados.email);
        
        console.log("Telefone:", dados.telefone);

        console.log(dados);

    });
   }
});