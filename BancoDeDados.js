const Sqlite3 = require('sqlite3').verbose()
const Consultas = require('./Consultas.js')

class BancoDeDados extends Consultas {
    constructor() {
        super()
        this.conexao = null 
        this.caminhoBanco = './db/baseDeDados.db'
        this.conectarAoBanco()
        this.entidade = ""
        this.sql = ""
        this.erro = null
        this.mensagemDeErro = ""
    }

    conectarAoBanco() {
        this.conexao = new Sqlite3.Database(this.caminhoBanco, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Conectado a base de dados.');
        })
    }

    inicializarBanco() {
        return new Promise((resolver, rejeitar) => {
            try {
                this.conexao.exec(Consultas.destruirTabelas);
                console.log("Destruiu as tabelas.")
                this.conexao.exec(Consultas.criarTabelas);
                console.log("Recriou as tabelas.")
                this.conexao.exec(Consultas.popularTabelas);
                console.log("Populou as tabelas.")
                resolver("resolvido")
            }
            catch(erro) {
                rejeitar("erro")
            }
        })
    }

    static trataMensagemDeErro(sql, erro) {

        let mensagemDeErro = `Ao tentar executar o sql >> ${sql} << retornou o seguinte erro >> ${erro.message} <<`
        console.log(mensagemDeErro)

        return mensagemDeErro
    }
    
    queryGenerica() {

        let sql = this.sql

        return new Promise((resolver, rejeitar) => {
            this.conexao.all(sql, [], (erro, linhas) => {
                if (erro) {
                    
                    let mensagemDeErro = BancoDeDados.trataMensagemDeErro(sql, erro)
                    rejeitar(mensagemDeErro)
                }else{
                    console.log(`Query retornou ${linhas.length} linhas`)
                    resolver(linhas)
                }
            })
        })

    }

    executarInsercao() {

        let sql = this.sql

        return new Promise((resolver, rejeitar) => {

            this.conexao.serialize(() => {

                this.conexao.exec(Consultas.fazValerChavesEstrangeiras, pragmaErro => {
                    if (pragmaErro) {
                        let pragmaErroMensagem = 'Falha na consulta do pragma de imposição de chave estrangeira.'
                        console.log(pragmaErroMensagem)
                        rejeitar(pragmaErroMensagem)
                    }
                })

                this.conexao.run(sql, [], function(erro) {
                    if (erro) {
                        let mensagemDeErro = BancoDeDados.trataMensagemDeErro(sql, erro)
                        rejeitar(mensagemDeErro)
                    }else{
                        let idRecemInserido = this.lastID
                        console.log(`Uma linha foi inserida com o id ${idRecemInserido}`)
                        resolver(idRecemInserido)
                    }
                })
            })
        })

    }
 
    executarAtualizacao() {

        let sql = this.sql

        return new Promise((resolver, rejeitar) => {

            this.conexao.serialize(() => {

                this.conexao.exec(Consultas.fazValerChavesEstrangeiras, pragmaErro => {
                    if (pragmaErro) {
                        let pragmaErroMensagem = 'Falha na consulta do pragma de imposição de chave estrangeira.'
                        console.log(pragmaErroMensagem)
                        rejeitar(pragmaErroMensagem)
                    }
                }) 

                this.conexao.run(sql, [], function(erro) {
                    if (erro) {
                        let mensagemDeErro = BancoDeDados.trataMensagemDeErro(sql, erro)
                        rejeitar(mensagemDeErro)
                    }else{
                        let linhasModificadas = this.changes
                        console.log(`Total de linhas modificadas: ${linhasModificadas}`)
                        resolver(linhasModificadas)
                    }
                })

            })
        })
    }
 
    executarDelecao() {
        let sql = this.sql

        return new Promise((resolver, rejeitar) => {

            this.conexao.serialize(() => {

                this.conexao.exec(Consultas.fazValerChavesEstrangeiras, pragmaErro => {
                    if (pragmaErro) {
                        let pragmaErroMensagem = 'Falha na consulta do pragma de imposição de chave estrangeira.'
                        console.log(pragmaErroMensagem)
                        rejeitar(pragmaErroMensagem)
                    }
                })

                this.conexao.run(sql, function(erro) {
                    if (erro) {
                        let mensagemDeErro = BancoDeDados.trataMensagemDeErro(sql, erro)
                        rejeitar(mensagemDeErro)
                    }else{
                        
                        let linhasApagadas = this.changes
                        console.log(`Total de linhas apagadas: ${linhasApagadas}.`)
                        resolver(linhasApagadas)

                    }
                })
            })
        })
    }


    deletaAnotacao(){
        let idAnotacao 
        let linhasApagadas

        idAnotacao = this.id

        this.sql = Consultas.queryDeletaAnotacao(idAnotacao)
        linhasApagadas = this.executarDelecao()

        return linhasApagadas 
    }

    deletaNota(){
        let idNota 
        let linhasApagadas

        idNota = this.id

        this.sql = Consultas.queryDeletaNota(idNota)
        linhasApagadas = this.executarDelecao()

        return linhasApagadas 
    }

    deletaCartao(){
        let idCartao 
        let linhasApagadas

        idCartao = this.id

        this.sql = Consultas.queryDeletaCartao(idCartao)
        linhasApagadas = this.executarDelecao()

        return linhasApagadas 
    }

    atualizaAnotacao(){
        let idAnotacao
        let titulo
        let resumo 
        let linhasModificadas

        idAnotacao = this.id
        titulo = this.titulo
        resumo = this.resumo

        this.sql = Consultas.queryAtualizaAnotacao(titulo, resumo, idAnotacao)
        linhasModificadas = this.executarAtualizacao()

        return linhasModificadas 
    }

    atualizaNota(){
        let idNota
        let titulo
        let resumo 
        let idAnotacao
        let linhasModificadas

        idNota = this.id
        titulo = this.titulo
        resumo = this.resumo
        idAnotacao = this.idAnotacao

        this.sql = Consultas.queryAtualizaNota(titulo, resumo, idNota, idAnotacao)
        linhasModificadas = this.executarAtualizacao()

        return linhasModificadas 
    }

    atualizaCartao(){
        let idCartao
        let titulo
        let resumo 
        let idNota
        let linhasModificadas

        idCartao = this.id
        titulo = this.titulo
        resumo = this.resumo
        idNota = this.idNota

        this.sql = Consultas.queryAtualizaCartao(titulo, resumo, idNota, idCartao)
        linhasModificadas = this.executarAtualizacao()

        return linhasModificadas 
    }

    buscarNotasDeUmaAnotacao(){
        let listaDeNotas
        let idAnotacao

        idAnotacao = this.id

        this.sql = Consultas.queryBuscarNotasDeUmaAnotacao(idAnotacao)
        listaDeNotas = this.queryGenerica()

        return listaDeNotas 
    }

    buscarCartoesDeUmaNota(){
        let listaDeCartoes
        let idNota

        idNota = this.id

        this.sql = Consultas.queryBuscarCartoesDeUmaNota(idNota)
        listaDeCartoes = this.queryGenerica()

        return listaDeCartoes 
    }

    inserirAnotacao(){
        let idAnotacao
        let titulo
        let resumo

        titulo = this.titulo
        resumo = this.resumo
        
        this.sql = Consultas.queryInserirAnotacao(titulo,resumo)
        
        idAnotacao = this.executarInsercao()

        return idAnotacao
    }
 
    inserirNota(){
        let idNota
        let titulo
        let resumo
        let idAnotacao

        titulo = this.titulo
        resumo = this.resumo
        idAnotacao = this.idAnotacao
        
        this.sql = Consultas.queryInserirNota(titulo,resumo,idAnotacao)
        idNota = this.executarInsercao()

        return idNota
    }

    inserirCartao(){
        let idCartao
        let titulo
        let resumo
        let idNota

        titulo = this.titulo
        resumo = this.resumo
        idNota = this.idNota
        
        this.sql = Consultas.queryInserirCartao(titulo,resumo,idNota)
        idCartao = this.executarInsercao()

        return idCartao
    }

    buscarTodos(){
        let dadosEncontrados
        let tabela

        tabela = this.entidade

        this.sql = Consultas.queryBuscarTodas(tabela)
        dadosEncontrados = this.queryGenerica()

        return dadosEncontrados 
    }

    buscarPorId(){
        let tabela
        let dadosEncontrados
        let id

        tabela = this.entidade
        id = this.id

        this.sql = Consultas.queryBuscarPorId(tabela, id)
        dadosEncontrados = this.queryGenerica()

        return dadosEncontrados
    }

}

module.exports = BancoDeDados
