class Notificacao {
    constructor(container) {
        this.linkHref = ""
        this.linkTexto = ""
        this.textoDestaque = ""
        this.container = container
        this.alerta = null
        this.destaque = null
        this.pulaLinha = null
        this.link = null
        this.botao = null
        this.parteQueFechaBotao = null
    }

    criar() {
        this.alerta = document.createElement("div")
        this.destaque = document.createElement("strong")
        this.pulaLinha = document.createElement("br")
        this.link = document.createElement("a")
        this.botao = document.createElement("button")
        this.parteQueFechaBotao = document.createElement("span")

        this.alerta.setAttribute("class", "alert alert-warning alert-dismissible fade show")
        this.alerta.setAttribute("role", "alert")
        
        this.link.setAttribute("href", `${this.linkHref}`)
        this.link.setAttribute("class","alert-link")

        this.botao.setAttribute("type","button")
        this.botao.setAttribute("class","close")
        this.botao.setAttribute("data-dismiss","alert")
        this.botao.setAttribute("aria-label","Close")

        this.parteQueFechaBotao.setAttribute("aria-hidden","true")

        this.parteQueFechaBotao.innerHTML = "&times;"
        this.destaque.innerHTML = this.textoDestaque
        this.link.innerHTML = this.linkTexto
        this.botao.appendChild(this.parteQueFechaBotao)

        this.alerta.appendChild(this.destaque)
        this.alerta.appendChild(this.pulaLinha)
        this.alerta.appendChild(this.link)
        this.alerta.appendChild(this.botao)

        this.container.appendChild(this.alerta)

        window.scrollTo(0, 0);
        setInterval(()=> location.reload(),3000);
    }
}
