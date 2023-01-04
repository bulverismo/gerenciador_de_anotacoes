const inputTitulo = document.getElementById('input-titulo-anotacao')
const inputResumo = document.getElementById('input-resumo-anotacao')
const botaoSalvar = document.getElementById('botao-salvar-anotacao')
const anotacao = new Anotacao()
const notificacao = new Notificacao()


function pegarInputs() {
    anotacao.titulo = inputTitulo.value
    anotacao.resumo = inputResumo.value
}

function limparEntradas() {
    inputTitulo.value = ""
    inputResumo.value = ""
}

function notificar(mensagem) {
    let container = document.getElementById("container-alerta")
    notificacao.textoDestaque = mensagem 
    notificacao.linkHref = "/"
    notificacao.linkTexto = "Clique aqui para ir para a pagina inicial."
    notificacao.container = container
    notificacao.criar()

}

async function salvar() {
    pegarInputs()
    anotacao.salvar()
    .then( dados => {
        notificar(dados.mensagem)
    })
    .catch( erro => {
        notificar(dados.mensagem)
    })
    limparEntradas()
}

botaoSalvar.addEventListener('click', salvar)
