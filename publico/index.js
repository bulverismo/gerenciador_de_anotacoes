const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const idAnotacao = urlParams.get('anotacao')
console.log(idAnotacao)

let temAnotacaoSelecionada = urlParams.has('anotacao')
console.log(temAnotacaoSelecionada)


const menuDropDownAnotacao = new MenuDropDown("anotacao", null, idAnotacao)
const containerListaAnotacoes = document.getElementById("container-lista-anotacoes")

containerListaAnotacoes.appendChild(menuDropDownAnotacao.elemento)

console.log(menuDropDownAnotacao.elemento.children[1].children)





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
