class MenuDropDown {
    constructor(entidade, idPai, idAvo) {
        this.dropDown = ""
        this.botao = ""
        this.menu = ""
        this.link = ""
        this.linkAtivo = ""
        this.entidade = entidade
        this.elemento = ""
        this.seleciodo = null
        this.idPai = idPai
        this.idAvo = idAvo
        this.url = ""
        this.urlLink = ""
        this.itemId = null
        this.preencherTitulo()
        this.criar()
        this.preencher()
    }

    preencherTitulo() {
        this.titulo = "Lista de "

        switch(this.entidade) {
            case "anotacao":
                this.titulo += "Anotações"
                this.url = `/api/${this.entidade}`
                break
            case "nota":
                this.titulo += "Notas"
                this.url = `/api/anotacao/${this.idPai}/notas`
                break
            case "cartao":
                this.titulo += "Cartões"
                this.url = `/api/nota/${this.idPai}/cartoes`
                break
        }

    }
 
    geraUrlLink() {

        switch(this.entidade) {
            case "anotacao":
                this.urlLink = `?${this.entidade}=${this.itemId}`
                break
            case "nota":
                this.urlLink = `?anotacao=${this.idPai}&nota=${this.itemId}`
                break
            case "cartao":
                this.urlLink = `?anotacao=${this.idAvo}&nota=${this.idPai}&cartao=${this.itemId}`
                break
        }   
    }

    criar() {
        this.dropDown = document.createElement("div")
        this.botao = document.createElement("button")
        this.menu = document.createElement("div")


        this.dropDown.setAttribute("class", "dropdown")

        this.botao.setAttribute("class","btn btn-primary btn-lg dropdown-toggle")
        this.botao.setAttribute("type", "button")
        this.botao.setAttribute("id", "dropdownMenuButton")
        this.botao.setAttribute("data-toggle", "dropdown")
        this.botao.setAttribute("aria-haspopup","true")
        this.botao.setAttribute("aria-expanded","false")
        this.botao.innerHTML = this.titulo

        this.menu.setAttribute("class", "dropdown-menu")
        this.menu.setAttribute("aria-labelledby", "dropdownMenuButton")

        
        this.dropDown.appendChild(this.botao)
        this.dropDown.appendChild(this.menu)

        this.elemento = this.dropDown
    }

    async preencher() {

        let listaDeLinks = []
        
        this.link = document.createElement("a")
        this.link.setAttribute("class","dropdown-item")
        this.link.setAttribute("href", "#")
        this.link.innerHTML = this.textoLink

        console.log(this.entidade)

        const dados = await fetch(this.url)
        const retorno  = await dados.json()

        console.log(retorno)

        if (retorno.sucesso) {
            for (let item of retorno.dados) {

                this.itemId = item.id
                this.geraUrlLink()

                this.link = document.createElement("a")
                this.link.setAttribute("class","dropdown-item")
                this.link.setAttribute("href", this.urlLink)
                this.link.innerHTML = item.titulo
                
                this.menu.appendChild(this.link)

            }
        }
    }
}
