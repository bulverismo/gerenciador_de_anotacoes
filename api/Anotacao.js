const BaseGeral = require('./BaseGeral.js')

class Anotacao extends BaseGeral {
    constructor() {
        super()
        this.entidade = "anotacao"
    }
   
    async idsDasMinhasNotas() {

        await this.buscarNotasDeUmaAnotacao()
            .then( notasDeUmaAnotacao => {

                if (notasDeUmaAnotacao.length > 0) {
                    let listaIdsDasNotas = []

                    for ( let item of notasDeUmaAnotacao) {
                        listaIdsDasNotas.push(item.id)
                    }

                    this.retorno.dados = listaIdsDasNotas
                    this.retorno.mensagem = "Notas de uma anotação foram buscadas com sucesso."
                    this.retorno.sucesso = true
                }else{
                    this.trataErro(`Anotação não tem notas ou não existe.`)
                }
            })
            .catch( erro => {
                this.trataErro(`Ocorreu um erro ao tentar buscar as notas.`)
            })

        return this.retorno
      
    }
    async preencherObjetoPeloId() {
 
        await this.buscarPorId()
            .then( dados => {
                this.retorno.dados = dados 

                if (dados.length > 0) {
                    dados = dados[0]
                    this.retorno.sucesso = true
                    this.retorno.mensagem = `Anotação com id ${this.id} encontrado.`
                    this.id = dados.id
                    this.titulo = dados.titulo
                    this.resumo = dados.resumo
                }else{
                    this.trataErro(`Anotação com id ${this.id} não encontrado.`)
                }
            })
            .catch( erro => {
                this.trataErro(`Ocorreu um erro ao tentar buscar id de tipo ${this.entidade}. >> ERRO: ${erro}`)
            })

        return this.retorno
    }
 
    async buscarMinhasNotas() {

        await this.buscarNotasDeUmaAnotacao()
            .then( notasDeUmaAnotacao => {
                
                if (notasDeUmaAnotacao.length > 0) {
                    this.retorno.dados = notasDeUmaAnotacao
                    this.retorno.mensagem = `Notas da anotação id ${this.id} foram buscadas com sucesso.`
                    this.retorno.sucesso = true
                }else{
                    this.trataErro("Anotação não tem notas associadas ou não existe.")
                }
            })
            .catch( erro => {
                this.trataErro("Ocorreu um erro ao tentar buscar as notas.")
            })

        return this.retorno

    }

}

module.exports = Anotacao
