const input = document.querySelector("input");
const botao = document.querySelector("button");
const ul = document.querySelector("ul");

const btnTodas = document.querySelector("#todas");
const btnPendentes = document.querySelector("#pendentes");
const btnConcluidas = document.querySelector("#concluidas");

// Pegar tarefas salvas Ou criar array vazio
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function renderizarTarefas(lista){
    ul.innerHTML = "";

    lista.forEach(tarefa =>{
        criarTarefa(tarefa);
    });
}
//todas
btnTodas.addEventListener("click", function(){
    renderizarTarefas(tarefas);
});
//pendentes
btnPendentes.addEventListener("click", function(){
    const pendentes = tarefas.filter(t => !t.concluida);
    renderizarTarefas(pendentes);
});
//concluidas
btnConcluidas.addEventListener("click", function(){
    const concluidas = tarefas.filter(t => t.concluida);
    renderizarTarefas(concluidas);
});


// Função para criar tarefa na tela 
function criarTarefa(tarefa){

    // Criar elemento na tela
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = tarefa.texto;


        // se estiver concluida, ja começa riscada
         if(tarefa.concluida){
            span.classList.add("concluida");
        }


        li.appendChild(span);

        //botão de excluir

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "❌";

        botaoExcluir.style.background = "red";
        
        li.appendChild(botaoExcluir);

        ul.appendChild(li);

        //botão de editar

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "✏️";

        li.appendChild(botaoEditar);


        //botão de editar
        botaoEditar.addEventListener("click", function(event){

            event.stopPropagation();

            // se já estiver editando -> cancelar
            if(li.querySelector("input")){
                li.replaceChild(span, li.querySelector("input"));
                return;
            }

            const inputEditar = document.createElement("input");
            inputEditar.value = tarefa.texto;

            li.replaceChild(inputEditar, span);

            inputEditar.focus();

            inputEditar.addEventListener("keydown", function(event){

                if(event.key === "Enter"){
                    tarefa.texto = inputEditar.value;

                    span.textContent = inputEditar.value;

                    li.replaceChild(span, inputEditar);

                    localStorage.setItem("tarefas", JSON.stringify(tarefas));
                }
            });
        });


        //Colocar risco
        li.addEventListener("click", function(){

            if(li.querySelector("input")) return;

            span.classList.toggle("concluida");

            tarefa.concluida = !tarefa.concluida;

            localStorage.setItem("tarefas", JSON.stringify(tarefas));
        });


         /*
        //Editar tarefa
        li.addEventListener("dblclick", function(){

            const inputEditar = document.createElement("input");
            inputEditar.value = tarefa.texto;

            li.replaceChild(inputEditar, span);

            inputEditar.focus();

            inputEditar.addEventListener("keydown", function(event){

                if(event.key === "Enter"){
                    tarefa.texto = inputEditar.value;

                    span.textContent = inputEditar.value;

                    li.replaceChild(span, inputEditar);

                    localStorage.setItem("tarefas", JSON.stringify(tarefas));
                }
            });

           
            //colocar risco na tarefa 
            span.classList.toggle("concluida");

            tarefa.concluida = !tarefa.concluida;

            localStorage.setItem("tarefas", JSON.stringify(tarefas));
            
        });
        */

        //exluir tarefa
        botaoExcluir.addEventListener("click", function(event){
            event.stopPropagation();

            
            
            //pegar texto da tarefa 
            //const texto = span.textContent;

            //remover do array
            tarefas = tarefas.filter(t => t.texto !== tarefa.texto);

            //salvar novameente
            localStorage.setItem("tarefas", JSON.stringify(tarefas));

            //remoover da tela
            li.remove();

        });

}

//  Carregar tarefas ao abrir
renderizarTarefas(tarefas);


botao.addEventListener("click", function() {

    if(input.value !== ""){

         // Adicionar no Array
            const novaTarefa = {
                texto: input.value,
                concluida: false
            }

            tarefas.push(novaTarefa);

            // Salvar no localStorage
            localStorage.setItem("tarefas", JSON.stringify(tarefas));

            criarTarefa(novaTarefa);
            
            input.value = "";
    }
      
});

//adicionar com ENTER
input.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        botao.click();
    }
});


