class Nota {
    constructor() {
        this.titulos = "" 
        this.corpo  = ""
        this.resumo = ""
        this.id = null 
        this.idAnotacao = null 
    }

    async excluir() {

        let dadosRequisicao = {
            method: 'DELETE'
        }

        const resposta = await fetch(`/api/nota/${this.id}`, dadosRequisicao)
        const retorno  = await resposta.json()

        return retorno 
    }

    async salvar() {

        let carga = {
            titulo: this.titulo,
            resumo: this.resumo,
            id_anotacao: this.idAnotacao
        }

        let dadosRequisicao = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(carga)
        }

        const resposta = await fetch(`/api/nota`, dadosRequisicao)
        const retorno  = await resposta.json()

        return retorno 
    }

    async preencher() {

        const respostaNota  = await fetch(`/api/nota/${this.id}`)
        const nota          = await respostaNota.json()

        const respostaMeusCartoes   = await fetch(`/api/nota/${this.id}/cartoes`)
        const meusCartoes           = await respostaMeusCartoes.json()

        for (let i = 0; i < this.titulos.length; i++) {
            this.titulos[i].innerHTML = nota.dados[0].titulo
        }

        for (let item of meusCartoes.dados) {

            let cartao = new Cartao()
            cartao.criar()

            cartao.titulo.innerHTML = item.titulo
            cartao.resumo.innerHTML = item.resumo

            this.corpo.appendChild(cartao.elemento)

        }
        
        this.resumo.innerHTML = nota.dados[0].resumo

    }
}
