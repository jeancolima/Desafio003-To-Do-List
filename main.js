const botaoAdicionar = document.querySelector(".botao-adicionar")
const lista = document.querySelector(".list")
const tarefaTexto = document.querySelector(".tarefa")
const tarefas = JSON.parse(localStorage.getItem("tarefas")) || []

botaoAdicionar.addEventListener("click", adicionaTarefa)

tarefas.forEach( (elemento) => {
    criaTarefa(elemento)
    riscaElemento(elemento)
})

function adicionaTarefa() {
    const tarefa = document.querySelector("#tarefa")

    if (tarefa.value !== "") {
    const tarefaAtual = {
        "nome": tarefa.value,
        "status": 'andamento'
    }

    criaTarefa(tarefaAtual)

    tarefas.push(tarefaAtual)

    localStorage.setItem("tarefas", JSON.stringify(tarefas))

    tarefa.focus()
    tarefa.value = ""
    }
}

function criaTarefa(item) {
    const itemLista = document.createElement('li')
    const paragrafo = document.createElement('p')
    const divButtons = document.createElement('div')
    const doneButton = document.createElement('button')
    const deleteButton = document.createElement('button')

    doneButton.innerHTML = '<i class="fa-solid fa-check"></i>'
    deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>'

    paragrafo.classList.add("tarefa")
    doneButton.classList.add("check")
    deleteButton.classList.add("delete")
    divButtons.classList.add("buttons")

    lista.appendChild(itemLista)
    itemLista.appendChild(paragrafo)
    itemLista.appendChild(divButtons)
    divButtons.appendChild(doneButton)
    divButtons.appendChild(deleteButton)
    paragrafo.innerHTML = item.nome;
}

document.addEventListener("click", (e) => {
    const targetEl = e.target
    const parentEl = targetEl.closest("li")

    const tarefa = parentEl.children[0].innerHTML

    if (targetEl.classList.contains("check")) {
        for (let i = 0; i < tarefas.length; i++) {
            if (tarefas[i].nome === tarefa) {
                if (tarefas[i].status === "andamento") {
                    tarefas[i].status = "feita";
                } else {
                    tarefas[i].status = "andamento";
                }                
            }
        }
        localStorage.setItem("tarefas", JSON.stringify(tarefas))

        parentEl.classList.toggle("feita")
    }
})

document.addEventListener("click", (e) => {
    const targetEl = e.target
    const parentEl = targetEl.closest("li")

    const tarefa = parentEl.children[0].innerHTML;

    if (targetEl.classList.contains("delete")) {
        for (let i = 0; i < tarefas.length; i++) {
            if (tarefas[i].nome === tarefa) {
                tarefas.splice(tarefas[i], 1);
            }
        }

        localStorage.setItem("tarefas", JSON.stringify(tarefas))
        parentEl.remove()
    }
})

function riscaElemento(item) {
    const itens = document.querySelectorAll(".list li")

    itens.forEach((e) => {
        const texto = e.children[0].innerHTML

        if (item.nome === texto) {
            if (item.status === "feita") {
                e.classList.add("feita")
            }
        }

    })

}
