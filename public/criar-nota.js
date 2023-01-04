const inputTitulo = document.getElementById('input-titulo-nota')
const inputResumo = document.getElementById('input-resumo-nota')
const botaoSalvar = document.getElementById('botao-salvar-nota')
const nota = new Nota()
const anotacao = new Anotacao()
const notificacao = new Notificacao()

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const idAnotacao = urlParams.get('anotacao')

const menuDropDownAnotacao = new MenuDropDown("anotacao")
const containerListaAnotacoes = document.getElementById("container-lista-anotacoes")
containerListaAnotacoes.appendChild(menuDropDownAnotacao.elemento)
let temAnotacaoSelecionada = urlParams.has('anotacao')

if (!temAnotacaoSelecionada) {
    const titulo = document.getElementById("titulo-anotacao")
    titulo.innerHTML = "Escolha uma anotação na lista acima para a qual a nota será inserida."
}else{
    anotacao.id = idAnotacao
    anotacao.titulo = document.getElementById("titulo-anotacao")
    anotacao.corpo  = document.getElementById("corpo-anotacao")
    anotacao.resumo = document.getElementById("resumo-anotacao")
    anotacao.preencher()
}

function pegarInputs() {
    nota.titulo = inputTitulo.value
    nota.resumo = inputResumo.value
    nota.idAnotacao = anotacao.id
    
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
    nota.salvar()
    .then( dados => {
        notificar(dados.mensagem)
    })
    .catch( erro => {
        notificar(dados.mensagem)
    })
    limparEntradas()
}

botaoSalvar.addEventListener('click', salvar)
