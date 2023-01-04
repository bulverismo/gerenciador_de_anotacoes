const inputTitulo = document.getElementById('input-titulo-cartao')
const inputResumo = document.getElementById('input-resumo-cartao')
const botaoSalvar = document.getElementById('botao-salvar-cartao')

const anotacao = new Anotacao()
const nota = new Nota()
const cartao = new Cartao()
const notificacao = new Notificacao()

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const idAnotacao = urlParams.get('anotacao')
const idNota = urlParams.get('nota')


const menuDropDownAnotacao = new MenuDropDown("anotacao")
const containerListaAnotacoes = document.getElementById("container-lista-anotacoes")
containerListaAnotacoes.appendChild(menuDropDownAnotacao.elemento)
let temAnotacaoSelecionada = urlParams.has('anotacao')

const menuDropDownNota = new MenuDropDown("nota", idAnotacao)
const containerListaNotas = document.getElementById("container-lista-notas")
containerListaNotas.appendChild(menuDropDownNota.elemento)
let temNotaSelecionada = urlParams.has('nota')

if (!temNotaSelecionada) {
    const titulos = document.getElementsByClassName("titulo-nota")
    for (let i = 0; i < titulos.length; i++) {
        titulos[i].innerHTML = "Escolha uma nota na lista acima após escolher uma anotação na lista mais acima."
    }
        
}else{
    nota.id = idNota
    nota.titulos = document.getElementsByClassName("titulo-nota")
    nota.corpo  = document.getElementById("corpo-nota")
    nota.resumo = document.getElementById("resumo-nota")
    nota.idAnotacao = idAnotacao
    nota.preencher()
}


if (!temAnotacaoSelecionada) {
    const titulo = document.getElementById("titulo-anotacao")
    titulo.innerHTML = "Escolha uma anotação na lista acima para poder escolher um cartão abaixo para poder associar o cartão a ela."
}else{
    anotacao.id = idAnotacao
    anotacao.titulo = document.getElementById("titulo-anotacao")
    anotacao.corpo  = document.getElementById("corpo-anotacao")
    anotacao.resumo = document.getElementById("resumo-anotacao")
    anotacao.preencher()
}

function pegarInputs() {
    cartao.titulo = inputTitulo.value
    cartao.resumo = inputResumo.value
    cartao.idNota = nota.id
    
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
    cartao.salvar()
    .then( dados => {
        notificar(dados.mensagem)
    })
    .catch( erro => {
        notificar(dados.mensagem)
    })
    limparEntradas()
}

botaoSalvar.addEventListener('click', salvar)
