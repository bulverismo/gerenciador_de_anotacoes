const BaseGeral = require('./BaseGeral.js')

class Nota extends BaseGeral {
    constructor() {
        super()
        this.entidade = "nota"
        this.idAnotacao = null
    }
   
    async idsDosMeusCartoes() {

        await this.buscarCartoesDeUmaNota()
            .then( cartoesDeUmaNota => {

                if (cartoesDeUmaNota.length > 0) {
                    let listaIdsDosCartoes = []

                    for ( let item of cartoesDeUmaNota) {
                        listaIdsDosCartoes.push(item.id)
                    }

                    this.retorno.dados = listaIdsDosCartoes
                    this.retorno.mensagem = "Cartões de uma nota foram buscadas com sucesso."
                }else{
                    this.trataErro(`Nota não tem cartões ou não existe.`)
                }
            })
            .catch( erro => {
                this.trataErro(`Ocorreu um erro ao tentar buscar os cartões de uma nota.`)
            })

        return this.retorno
      
    }
    async preencherObjetoPeloId(id) {
 
        await this.buscarPorId(id)
            .then( dados => {
                this.retorno.dados = dados 

                if (dados.length > 0) {
                    dados = dados[0]
                    this.retorno.mensagem = `Nota com id ${id} encontrado.`
                    this.id = dados.id
                    this.titulo = dados.titulo
                    this.resumo = dados.resumo
                    this.idAnotacao = dados.idAnotacao
                }else{
                    this.trataErro(`Nota com id ${id} não encontrado.`)
                }
            })
            .catch( erro => {
                this.trataErro(`Ocorreu um erro ao tentar buscar id de tipo ${this.entidade}.`)
            })

        return this.retorno
    }
 
    async buscarMeusCartoes() {

        await this.buscarCartoesDeUmaNota()
            .then( cartoesDeUmaNota => {
                
                if (cartoesDeUmaNota.length > 0) {
                    this.retorno.dados = cartoesDeUmaNota
                    this.retorno.mensagem = `Cartões da nota id ${this.id} foram buscadas com sucesso.`
                }else{
                    this.trataErro("Nota não tem cartões associados.")
                }
            })
            .catch( erro => {
                this.trataErro("Ocorreu um erro ao tentar buscar as cartões de uma nota.")
            })

        return this.retorno

    }

}

module.exports = Nota
