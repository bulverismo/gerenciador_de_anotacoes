class Anotacao {
    constructor() {
        this.titulo = "" 
        this.corpo  = ""
        this.resumo = ""
        this.id = null
    }

    async excluir() {

        let dadosRequisicao = {
            method: 'DELETE'
        }

        const resposta = await fetch(`/api/anotacao/${this.id}`, dadosRequisicao)
        const retorno  = await resposta.json()

        return retorno 
    }


    async salvar() {

        let carga = {
            titulo: this.titulo,
            resumo: this.resumo
        }

        let dadosRequisicao = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(carga)
        }

        const resposta = await fetch(`/api/anotacao`, dadosRequisicao)
        const retorno  = await resposta.json()

        return retorno 
    }

    async preencher() {

        const respostaAnotacao  = await fetch(`/api/anotacao/${this.id}`)
        const anotacao          = await respostaAnotacao.json()

        const respostaMinhasNotas   = await fetch(`/api/anotacao/${this.id}/notas`)
        const minhasNotas           = await respostaMinhasNotas.json()

        console.log(anotacao.dados[0].titulo)
        this.titulo.innerHTML = anotacao.dados[0].titulo

        for (let item of minhasNotas.dados) {

                let link = document.createElement("a")
                let pulaLinha = document.createElement("br")

                link.setAttribute("href", `nota?anotacao=${this.id}&nota=${item.id}`)
                link.innerHTML = item.titulo
                
                this.corpo.appendChild(link)
                this.corpo.appendChild(pulaLinha)

        }
        
        this.resumo.innerHTML = anotacao.dados[0].resumo

    }
}
