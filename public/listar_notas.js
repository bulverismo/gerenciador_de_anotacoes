const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

const idAnotacao = urlParams.get('anotacao')
const idNota = urlParams.get('nota')

const menuDropDownNota = new MenuDropDown("nota", idAnotacao)
const menuDropDownAnotacao = new MenuDropDown("anotacao", null, idAnotacao)

const containerListaAnotacoes = document.getElementById("container-lista-anotacoes")
const containerListaNotas = document.getElementById("container-lista-de-notas")

let temAnotacaoSelecionada = urlParams.has('anotacao')
let temNotaSelecionada = urlParams.has('nota')

containerListaNotas.appendChild(menuDropDownNota.elemento)
containerListaAnotacoes.appendChild(menuDropDownAnotacao.elemento)


if (!temNotaSelecionada) {
    const titulos = document.getElementsByClassName("titulo-nota")
    for (let i = 0; i < titulos.length; i++) {
        titulos[i].innerHTML = "Escolha uma nota na lista acima."
    }
        
}else{
    const nota = new Nota()
    nota.id = idNota
    nota.titulos = document.getElementsByClassName("titulo-nota")
    nota.corpo  = document.getElementById("corpo-nota")
    nota.resumo = document.getElementById("resumo-nota")
    nota.idAnotacao = idAnotacao
    nota.preencher()
}

if (!temAnotacaoSelecionada) {
    const titulo = document.getElementById("titulo-anotacao")
    titulo.innerHTML = "Escolha uma anotação na lista acima."
}else{
    const anotacao = new Anotacao()
    anotacao.id = idAnotacao
    anotacao.titulo = document.getElementById("titulo-anotacao")
    anotacao.corpo  = document.getElementById("corpo-anotacao")
    anotacao.resumo = document.getElementById("resumo-anotacao")
    anotacao.preencher()
}
