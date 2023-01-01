const BancoDeDados = require('./BancoDeDados.js')
const Anotacao = require('./Anotacao.js')
const Nota = require('./Nota.js')
const Cartao = require('./Cartao.js')
const Express = require('express')

const app = Express()
const PORTA = 3000

let banco = new BancoDeDados()

banco.inicializarBanco()
    .then( ret => console.log(ret) )
    .catch( erro => console.log(erro) )

let anotacao = new Anotacao()
let nota = new Nota()
let cartao = new Cartao()

//// Bem vindo

app.get('/', (requisicao, resposta) => {
    resposta.send('Bem vindo')
})

//// ANOTAÇÕES

    //// CRIAÇÃO 

app.post('/anotacao', (requisicao, resposta) => {
    resposta.send('criando anotação')
})

    //// LEITURA

app.get('/anotacao/todas', (requisicao, resposta) => {
    
    anotacao.todas()
    .then( data => {
        resposta.send(data)
    })
    
    console.log('GET todas anotações')
})

app.get('/anotacao/:idAnotacao', (requisicao, resposta) => {
    let idAnotacao = requisicao.params.idAnotacao
 
    
    .then( data => {
        resposta.send(data)
    })
    
    console.log('GET todas anotações')
    console.log(idAnotacao)
    resposta.send(`Buscando anotação ${idAnotacao}`)
})

app.get('/anotacao/:idAnotacao/notas', (requisicao, resposta) => {
    let idAnotacao = requisicao.params.idAnotacao
    console.log(idAnotacao)
    resposta.send(`Buscando notas da anotação ${idAnotacao}`)
})
    
    //// ATUALIZAÇÃO

app.put('/anotacao/:idAnotacao', (requisicao, resposta) => {
    let idAnotacao = requisicao.params.idAnotacao
    console.log(idAnotacao)
    resposta.send(`Atualizando anotação ${idAnotacao}`)
})

    //// DELEÇÃO 

app.delete('/anotacao/:idAnotacao', (requisicao, resposta) => {
    let idAnotacao = requisicao.params.idAnotacao
    console.log(idAnotacao)
    resposta.send(`Deletando anotação ${idAnotacao}`)
})



///// NOTAS

    //// CRIAÇÃO 

app.post('/nota', (requisicao, resposta) => {
    resposta.send('criando nota')
})

    //// LEITURA

app.get('/nota/todas', (requisicao, resposta) => {

    nota.todas()
    .then( data => {
        resposta.send(data)
    })
    
    console.log('GET todas notas')
})

app.get('/nota/:idNota', (requisicao, resposta) => {
    let idNota = requisicao.params.idNota
    console.log(idNota)
    resposta.send(`Buscando nota ${idNota}`)
})

app.get('/nota/:idNota/cartoes', (requisicao, resposta) => {
    let idNota = requisicao.params.idNota
    console.log(idNota)
    resposta.send(`Buscando cartões da nota ${idNota}`)
})

    //// ATUALIZAÇÃO

app.put('/nota/:idNota', (requisicao, resposta) => {
    let idNota = requisicao.params.idNota
    console.log(idNota)
    resposta.send(`Atualizando nota ${idNota}`)
})

    //// DELEÇÃO

app.delete('/nota/:idNota', (requisicao, resposta) => {
    let idNota = requisicao.params.idNota
    console.log(idNota)
    resposta.send(`Deletando nota ${idNota}`)
})



///// CARTÕES

    //// CRIAÇÃO

app.post('/cartao', (requisicao, resposta) => {
    resposta.send('criando cartão')
})

    //// LEITURA

app.get('/cartao/todos', (requisicao, resposta) => {

    cartao.todas()
    .then( data => {
        resposta.send(data)
    })
    
    console.log('GET todos cartões')
})

app.get('/cartao/:idCartao', (requisicao, resposta) => {
    let idCartao = requisicao.params.idCartao
    console.log(idCartao)
    resposta.send(`Buscando cartão ${idCartao}`)
})

    //// ATUALIZAÇÃO

app.put('/cartao/:idCartao', (requisicao, resposta) => {
    let idCartao = requisicao.params.idCartao
    console.log(idCartao)
    resposta.send(`Atualizando cartão ${idCartao}`)
})

    //// DELEÇÃO

app.delete('/cartao/:idCartao', (requisicao, resposta) => {
    let idCartao = requisicao.params.idCartao
    console.log(idCartao)
    resposta.send(`Deletando cartão ${idCartao}`)
})

app.listen(PORTA , () => {
    console.log(`Ouvindo na porta ${PORTA}`)
})

