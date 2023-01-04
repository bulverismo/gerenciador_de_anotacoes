const botaoExcluirCartao = document.getElementById('botao-excluir-cartao')
const botaoExcluirNota = document.getElementById('botao-excluir-nota')
const botaoExcluirAnotacao = document.getElementById('botao-excluir-anotacao')

const anotacao = new Anotacao()
const nota = new Nota()
const cartao = new Cartao()
const notificacao = new Notificacao()

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const idAnotacao = urlParams.get('anotacao')
const idNota = urlParams.get('nota')
const idCartao = urlParams.get('cartao')


const menuDropDownAnotacao = new MenuDropDown("anotacao")
const containerListaAnotacoes = document.getElementById("container-lista-anotacoes")
containerListaAnotacoes.appendChild(menuDropDownAnotacao.elemento)
let temAnotacaoSelecionada = urlParams.has('anotacao')

const menuDropDownNota = new MenuDropDown("nota", idAnotacao)
const containerListaNotas = document.getElementById("container-lista-notas")
containerListaNotas.appendChild(menuDropDownNota.elemento)
let temNotaSelecionada = urlParams.has('nota')

const menuDropDownCartao = new MenuDropDown("cartao", idNota, idAnotacao)
const containerListaCartao = document.getElementById("container-lista-cartoes")
containerListaCartao.appendChild(menuDropDownCartao.elemento)
let temCartaoSelecionado = urlParams.has('cartao')

if (!temCartaoSelecionado) {
    const titulos = document.getElementsByClassName("titulo-cartao")
    for (let i = 0; i < titulos.length; i++) {
        titulos[i].innerHTML = "Escolha um cartão na lista acima para excluir."
    }
}else{
    cartao.id = idCartao
    cartao.titulos = document.getElementsByClassName("titulo-cartao")
    cartao.resumo = document.getElementById("resumo-cartao")
    cartao.idNota = idNota
    cartao.preencher()
}
       
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

function notificar(mensagem) {
    let container = document.getElementById("container-alerta")
    notificacao.textoDestaque = mensagem 
    notificacao.linkHref = "/"
    notificacao.linkTexto = "Clique aqui para ir para a pagina inicial ou aguarde 3 segundos até a pagina atualizar."
    notificacao.container = container
    notificacao.criar()
}

async function excluirCartao() {
    cartao.excluir()
    .then( dados => {
        notificar(dados.mensagem)
    })
    .catch( erro => {
        notificar(dados.mensagem)
    })
}

async function excluirNota() {
    nota.excluir()
    .then( dados => {
        notificar(dados.mensagem)
    })
    .catch( erro => {
        notificar(dados.mensagem)
    })
}

async function excluirAnotacao() {
    anotacao.excluir()
    .then( dados => {
        notificar(dados.mensagem)
    })
    .catch( erro => {
        notificar(dados.mensagem)
    })
}

botaoExcluirCartao.addEventListener('click', excluirCartao)
botaoExcluirNota.addEventListener('click', excluirNota)
botaoExcluirAnotacao.addEventListener('click', excluirAnotacao)
