import { searchDict, searchDictMirror } from './searchDict.js'

class ChartElement extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.template = document.querySelector('#graph').cloneNode(true).content
    this.heading = this.template.querySelector('#header')
    this.description = this.template.querySelector('#description')
    this.chartCanvas = this.template.querySelector('#chartCanvas')
    this.shadow.appendChild(this.template)
    this.url = `http://localhost:3000/index/county/${this.county}`
    
  }

  async fetchData () {
    const response = await fetch(this.url, { mode: 'cors' })
    const data = await response.json()
    this.generateChart(await data)
  }
}

export { ChartElement }