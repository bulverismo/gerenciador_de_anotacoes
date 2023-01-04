class Cartao {
    constructor() {
        this.linha = ""
        this.containerTitulo = ""
        this.titulo = ""
        this.titulos = ""
        this.resumo = ""
        this.idNota = null
    }

    async excluir() {

        let dadosRequisicao = {
            method: 'DELETE'
        }

        const resposta = await fetch(`/api/cartao/${this.id}`, dadosRequisicao)
        const retorno  = await resposta.json()

        return retorno 
    }

    async salvar() {

        let carga = {
            titulo: this.titulo,
            resumo: this.resumo,
            id_nota: this.idNota
        }

        let dadosRequisicao = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(carga)
        }

        const resposta = await fetch(`/api/cartao`, dadosRequisicao)
        const retorno  = await resposta.json()

        return retorno 
    }

    criar() {
        this.linha = document.createElement("div")
        this.containerTitulo = document.createElement("div")
        this.titulo = document.createElement("b")
        this.resumo = document.createElement("div")

        this.linha.setAttribute("class","row")
        this.containerTitulo.setAttribute("class","col-sm-2 text-center")

        this.resumo.setAttribute("class","col-sm-10")
        this.resumo.setAttribute("style","padding-bottom:10px;")

        this.containerTitulo.appendChild(this.titulo)
        this.linha.appendChild(this.containerTitulo)
        this.linha.appendChild(this.resumo)

        this.elemento = this.linha

    }
    async preencher() {

        const respostaCartao  = await fetch(`/api/cartao/${this.id}`)
        const cartao          = await respostaCartao.json()

        if(cartao.dados[0]) {
            for (let i = 0; i < this.titulos.length; i++) {
                this.titulos[i].innerHTML = cartao.dados[0].titulo
            }

            this.resumo.innerHTML = cartao.dados[0].resumo
        }

    }

}
