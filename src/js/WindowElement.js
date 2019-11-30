class WindowElement extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.template = document
      .querySelector('#window-template')
      .cloneNode(true).content
    this.canvas = this.template.querySelector('.card-content')
    this.footer = this.template.querySelector('.card-footer')
    this.canvas.innerHTML = ''
  }

  connectedCallback () {
    this.shadow.append(this.template)
    const styleSheet = this.createStyleLink('https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css')
    this.canvas.append(styleSheet)

    this.id = WindowElement.count
    console.log(WindowElement.count)
    WindowElement.count += 1

    this.style = `top: ${170 + this.id * 10}px; left: ${370 + this.id * 10}px;`
  }

  createStyleLink (url) {
    const styleSheet = document.createElement('link')
    styleSheet.rel = 'stylesheet'
    styleSheet.href = url
    return styleSheet
  }

}

customElements.define('window-element', WindowElement)
export { WindowElement }
