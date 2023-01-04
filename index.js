const BancoDeDados = require('./BancoDeDados.js')
const Anotacao = require('./Anotacao.js')
const Nota = require('./Nota.js')
const Cartao = require('./Cartao.js')
const Express = require('express')

const app = Express()
const PORTA = 3000

const validarString = (string, atributo) => {

    if (!string) {
        return atributo
    }else{
        return string
    }
    
}

let anotacao = new Anotacao()
let nota = new Nota()
let cartao = new Cartao()
let banco = new BancoDeDados()

//banco.inicializarBanco()
//    .then( ret => console.log("inicializado ") )
//    .catch( erro => console.log(erro) )
//

app.use(Express.static('publico', { extensions: ['html', 'htm']}))
app.use(Express.json())

// TODO: Validar requisicao.body

//// ANOTAÇÕES

    //// CRIAÇÃO 

app.post('/api/anotacao', (requisicao, resposta) => {

    let titulo = requisicao.body.titulo
    let resumo = requisicao.body.resumo

    anotacao.titulo = titulo ? titulo : ""
    anotacao.resumo = resumo ? resumo : ""

    anotacao.inserir()
    .then( dados => {
        resposta.send(dados)
    })
    .catch( erro => {
        console.log(`Ocorreu o erro ${erro}`)
        resposta.send("Erro ao tentar inserir.")
    })

    console.log(`POST anotação`)
    console.log(requisicao.body)
})

    //// LEITURA

app.get('/api/anotacao', (requisicao, resposta) => {
    
    anotacao.todas()
    .then( data => {
        resposta.send(data)
    })
    
    console.log('GET todas anotações')
})

app.get('/api/anotacao/:idAnotacao', (requisicao, resposta) => {
    let idAnotacao = requisicao.params.idAnotacao
 
    anotacao.id = idAnotacao
    
    anotacao.ler()
        .then( data => {
        resposta.send(data)
    })
    
    console.log(`GET anotação ${idAnotacao}`)
})

app.get('/api/anotacao/:idAnotacao/notas', (requisicao, resposta) => {
    let idAnotacao = requisicao.params.idAnotacao

    anotacao.id = idAnotacao

    anotacao.buscarMinhasNotas()
    .then( data => {
        resposta.send(data)
    })
    
    console.log(`GET notas da anotação ${idAnotacao}`)
})
    
    //// ATUALIZAÇÃO


app.put('/api/anotacao/:idAnotacao', async (requisicao, resposta) => {

    let idAnotacao = requisicao.params.idAnotacao
    let titulo = requisicao.body.titulo
    let resumo = requisicao.body.resumo
    let retorno

    anotacao.id = idAnotacao

    await anotacao.preencherObjetoPeloId(idAnotacao)
    .then( dados => {
        console.log(dados)
        if (dados.sucesso) {
            console.log("Conseguiu preencher objeto anotação pelo id")
        }else{
            console.log("Erro ao tentar preencher o objeto pelo id.")
        }
    })
    .catch( erro => {
        console.log(`Ocorreu o erro ${erro}`)
    })

    anotacao.titulo = validarString(titulo, anotacao.titulo)
    anotacao.resumo = validarString(resumo, anotacao.resumo)

    await anotacao.atualiza()
    .then( dados => {
        retorno = dados
    })
    .catch( erro => {
        console.log(`Ocorreu o erro ${erro}`)
        retorno = erro
    })

    resposta.send(retorno)

    console.log(`PUT anotação`)
    console.log(requisicao.body)

})

    //// DELEÇÃO 

app.delete('/api/anotacao/:idAnotacao', (requisicao, resposta) => {
    let idAnotacao = requisicao.params.idAnotacao

    anotacao.id = idAnotacao

    anotacao.deleta()
    .then( data => {
        resposta.send(data)
    })
    
    console.log(`DELETE anotacao ${idAnotacao}`)
})



///// NOTAS

    //// CRIAÇÃO 

app.post('/api/nota', (requisicao, resposta) => {

    let titulo = requisicao.body.titulo
    let resumo = requisicao.body.resumo
    let idAnotacao = requisicao.body.id_anotacao

    nota.titulo = titulo ? titulo : ""
    nota.resumo = resumo ? resumo : ""
    nota.idAnotacao = idAnotacao

    nota.inserir()
    .then( dados => {
        resposta.send(dados)
    })
    .catch( erro => {
        console.log(`Ocorreu o erro ${erro}`)
        resposta.send("Erro ao tentar inserir.")
    })

    console.log(`POST nota`)
    console.log(requisicao.body)
})

    //// LEITURA

app.get('/api/nota', (requisicao, resposta) => {

    nota.todas()
    .then( data => {
        resposta.send(data)
    })
    
    console.log('GET todas notas')
})

app.get('/api/nota/:idNota', (requisicao, resposta) => {
    let idNota = requisicao.params.idNota

    nota.id = idNota

    nota.ler()
    .then( data => {
        resposta.send(data)
    })

    console.log(`GET nota ${idNota}`)
})

app.get('/api/nota/:idNota/cartoes', (requisicao, resposta) => {
    let idNota = requisicao.params.idNota

    nota.id = idNota

    nota.buscarMeusCartoes()
    .then( data => {
        resposta.send(data)
    })

    console.log(`GET cartoes da nota ${idNota}`)
})

    //// ATUALIZAÇÃO

app.put('/api/nota/:idNota', async (requisicao, resposta) => {
    let idNota = requisicao.params.idNota
    let titulo = requisicao.body.titulo
    let resumo = requisicao.body.resumo
    let idAnotacao = requisicao.body.id_anotacao
    let retorno

    nota.id = idNota

    await nota.preencherObjetoPeloId()
    .then( dados => {
        console.log(dados)
        if (dados.sucesso) {
            console.log("Conseguiu preencher objeto anotação pelo id")
        }else{
            console.log("Erro ao tentar preencher o objeto pelo id.")
        }
    })
    .catch( erro => {
        console.log(`Ocorreu o erro ${erro}`)
    })

    nota.titulo = validarString(titulo, nota.titulo)
    nota.resumo = validarString(resumo, nota.resumo)
    nota.idAnotacao = idAnotacao

    await nota.atualiza()
    .then( dados => {
        retorno = dados
    })
    .catch( erro => {
        console.log(`Ocorreu o erro ${erro}`)
        retorno = erro
    })

    resposta.send(retorno)

    console.log(`PUT nota`)
    console.log(requisicao.body)

})

    //// DELEÇÃO

app.delete('/api/nota/:idNota', (requisicao, resposta) => {
    let idNota = requisicao.params.idNota

    nota.id = idNota

    nota.deleta()
    .then( data => {
        resposta.send(data)
    })

    console.log(`DELETE nota ${idNota}`)
})

///// CARTÕES

    //// CRIAÇÃO

app.post('/api/cartao', (requisicao, resposta) => {

    let titulo = requisicao.body.titulo
    let resumo = requisicao.body.resumo
    let idNota = requisicao.body.id_nota

    cartao.titulo = titulo ? titulo : ""
    cartao.resumo = resumo ? resumo : ""
    cartao.idNota = idNota

    cartao.inserir()
    .then( dados => {
        resposta.send(dados)
    })
    .catch( erro => {
        console.log(`Ocorreu o erro ${erro}`)
        resposta.send("Erro ao tentar inserir.")
    })

    console.log(`POST cartão`)
    console.log(requisicao.body)
})

    //// LEITURA

app.get('/api/cartao', (requisicao, resposta) => {

    cartao.todas()
    .then( data => {
        resposta.send(data)
    })
    
    console.log('GET todos cartões')
})

app.get('/api/cartao/:idCartao', (requisicao, resposta) => {
    let idCartao = requisicao.params.idCartao

    cartao.id = idCartao

    cartao.ler()
    .then( data => {
        resposta.send(data)
    })
    
    console.log(`GET cartão ${idCartao}`)
})

    //// ATUALIZAÇÃO

app.put('/api/cartao/:idCartao', async (requisicao, resposta) => {
    let idCartao = requisicao.params.idCartao
    let titulo = requisicao.body.titulo
    let resumo = requisicao.body.resumo
    let idNota = requisicao.body.id_nota
    let retorno

    cartao.id = idCartao

    await cartao.preencherObjetoPeloId()
    .then( dados => {
        console.log(dados)
        if (dados.sucesso) {
            console.log("Conseguiu preencher objeto cartão pelo id")
        }else{
            console.log("Erro ao tentar preencher o cartão pelo id.")
        }
    })
    .catch( erro => {
        console.log(`Ocorreu o erro ${erro}`)
    })

    cartao.titulo = validarString(titulo, cartao.titulo)
    cartao.resumo = validarString(resumo, cartao.resumo)
    cartao.idNota = idNota

    await cartao.atualiza()
    .then( dados => {
        retorno = dados
    })
    .catch( erro => {
        console.log(`Ocorreu o erro ${erro}`)
        retorno = erro
    })

    resposta.send(retorno)

    console.log(`PUT cartão`)
    console.log(requisicao.body)

})

    //// DELEÇÃO

app.delete('/api/cartao/:idCartao', (requisicao, resposta) => {
    let idCartao = requisicao.params.idCartao

    cartao.id = idCartao

    cartao.deleta()
    .then( data => {
        resposta.send(data)
    })
    
    console.log(`DELETE cartão ${idCartao}`)

})

app.listen(PORTA , (err) => {

    if (err) console.log(err)
    console.log(`Ouvindo na porta ${PORTA}`)
})

//module.exports = app
