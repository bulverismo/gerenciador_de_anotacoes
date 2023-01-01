const BancoDeDados = require('./BancoDeDados.js')

class BaseGeral extends BancoDeDados {
    constructor() {
        super()
        this.id = null
        this.titulo = ""
        this.resumo = ""
        this.retorno = 
            {
                "mensagem": "",
                "sucesso": true, 
                "dados" : [] 
            }
    }

    trataErro(mensagemDeErro) {
        this.retorno.dados = [] 
        this.retorno.sucesso = false
        this.retorno.mensagem = mensagemDeErro
    }

    escolherEntidade() {

        switch(this.entidade) {
            case "anotacao":
                return "Anotacao"
                break;

            case "nota":
                return "Nota"
                break;

            case "cartao":
                return "Cartao"
                break;
            default:
                console.log("Não foi possível escollher a entidade.")
        } 
    }

    async ler() {

        if (this.id) {
            //let metodo = "preencherObjetoPeloId"
            
            //return await this[metodo](this.id)
            return await this.preencherObjetoPeloId(this.id)
        }else{
            this.trataErro("Objeto não está associado a nenhum id")
            return this.retorno
        }
        
    }

    async inserir() {

        let entidade = this.escolherEntidade()
        let metodo = `inserir${entidade}`

        await this[metodo]()
            .then( idInserido => {
                this.id = idInserido
                this.retorno.dados = { "idInserido": idInserido }
                this.retorno.mensagem = `${entidade} inserida com sucesso.`
            })
            .catch( erro => {
                this.trataErro(`Ocorreu um erro ao tentar inserir ${entidade}.`)
            })

        return this.retorno
    }

    async deleta() {

        let entidade = this.escolherEntidade()
        let metodo = `deleta${entidade}`

        await this.deletaCartao()
            .then( linhasApagadas => {

                if (linhasApagadas > 0) {
                    this.retorno.dados = { "linhasApagadas": linhasApagadas }
                    this.retorno.mensagem = "Deleção feita com sucesso."
                    this.retorno.sucesso = true
                }else{
                    this.trataErro(`Não não foi possível deletar entidade do tipo ${entidade}.`)
                }
            })
            .catch( erro => {
                this.trataErro(`Ocorreu um erro ao tentar deletar uma entidade do tipo ${entidade}.`)
            })

        return this.retorno
    }

    async todas() {

        let entidade = this.escolherEntidade()

        await this.buscarTodos()
            .then( todos => {

                if (todos.length > 0) {
                    this.retorno.dados = todos
                    this.retorno.mensagem = `Conseguiu buscar todos registros de entidades do tipo ${entidade}.`
                }else{
                    this.trataErro(`Não foram encontradas registros de entidades do tipo ${entidade}.`)
                }
            })
            .catch( erro => {
                this.trataErro(`Ocorreu um erro ao tentar buscar registros do tipo ${entidade}.`)
            })

        return this.retorno

    }

    async atualiza() {
        
        let entidade = this.escolherEntidade()
        let metodo = `atualiza${entidade}`

        await this[metodo]()
            .then( linhasModificadas => {

                if (linhasModificadas > 0) {
                    this.retorno.dados = { "linhasModificadas": linhasModificadas }
                    this.retorno.mensagem = `Atualização do registro do tipo ${entidade} feita com sucesso.`
                }else{
                    this.trataErro(`Não foi possível realizar atualização da entidade do tipo ${entidade}.`)
                }
            })
            .catch( erro => {
                this.trataErro(`Ocorreu um erro ao tentar atualizar entidade do tipo ${entidade}.`)
            })

        return this.retorno

    }
}

module.exports = BaseGeral
