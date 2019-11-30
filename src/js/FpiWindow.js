import { getLocation } from './getLocation.js'
import { searchDict } from './searchDict.js'

class FpiWindow extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
        this.template = document.querySelector('#window-template').cloneNode(true).content
        this.canvas = this.template.querySelector('.canvas')

        this.searchTemplate = document.querySelector('#fastighetsPrisIndexTemplate').cloneNode(true).content
        this.searchInput = this.searchTemplate.querySelector('#searchInput')
        this.searchForm = this.searchTemplate.querySelector('#searchForm')
        this.canvas.append(this.searchTemplate)

    }

    /**
     * Executed when reaching DOM
     */
    connectedCallback () {
        this.shadow.append(this.template)
        this.searchInput.focus()

        this.id = WindowElement.COUNT
        this.style = `top: ${170 + this.id * 10}px; left: ${370 + this.id * 10}px;`
        WindowElement.count++

        this.searchForm.addEventListener('submit', this.searchFormSubmit.bind(this))
        this.addEventListener('click', this.putOnTop)
        this.addEventListener('click', this.focusOnInput)

        setTimeout(this.findLocation.bind(this), 2*1000)
    }

    /**
     * Prompts user for access to their location
     * If accepted, searches for their county
     */
    findLocation () {
        const footerItems = document.querySelector('#locationDetectFooter').cloneNode(true).content
        this.canvas.append(footerItems)

        const one = new Promise((resolve, reject) => {
            resolve(getLocation())
        })

        one.then(location => {
            this.searchInput.value = location
        }).then(resp => {
            this.searchFormSubmit()
            this.canvas.querySelector('.notification').remove()
        }, rejected => {
            this.footer.innerHTML = ''
        })

    }

    /**
     * Validates search and submits it
     * @param  {Event} event
     */
    async searchFormSubmit (event) {
        event ? event.preventDefault() : event = null
        const searchQuery = searchDict[this.searchInput.value]

        if (this.searchInput.value.length < 1 || searchQuery === undefined) {
            this.searchInput.classList.add('is-danger')
            return
        }
        this.searchInput.classList.remove('is-danger')

        const buttonElement = this.canvas.querySelector('#searchSubmit')
        buttonElement.classList.add('is-loading')

        const element = document.createElement('section')
        element.innerHTML = `<fastighetspris-index county="${searchQuery}"></fastighetspris-index>`

        const dataSection = this.shadow.querySelector('#dataSectionContainer')

        setTimeout(() => {
            buttonElement.classList.remove('is-loading')
            dataSection.innerHTML = ''
            dataSection.appendChild(element)
        }, 300)
    }

    /**
     * When user clicks on area,
     * focus on input
     * @param  {Event} event
     */
    focusOnInput (event) {
        this.searchInput.focus()
      }
}


customElements.define('fpi-window', FpiWindow)
export { FpiWindow }