const BaseGeral = require('./BaseGeral.js')

class Cartao extends BaseGeral {
    constructor() {
        super()
        this.entidade = "cartao"
        this.idNota = null
    }
   
    async preencherObjetoPeloId() {
 
        await this.buscarPorId()
            .then( dados => {
                this.retorno.dados = dados 

                if (dados.length > 0) {
                    dados = dados[0]
                    this.retorno.mensagem = `Cartão com id ${this.id} encontrado.`
                    this.id = dados.id
                    this.titulo = dados.titulo
                    this.resumo = dados.resumo
                    this.idNota = dados.idNota
                }else{
                    this.trataErro(`Cartão com id ${this.id} não encontrado.`)
                }
            })
            .catch( erro => {
                this.trataErro(`Ocorreu um erro ao tentar buscar id de tipo ${this.entidade}. >> ERRO ${erro}`)
            })

        return this.retorno
    }
}

module.exports = Cartao
