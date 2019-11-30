import { ChartElement } from './ChartElement.js'
import { searchDict, searchDictMirror } from './searchDict.js'

class Fastighetsprisindex extends ChartElement {
  constructor () {
    super()
    this.fetchData()
  }

  connectedCallback () {
    this.heading.textContent =
      'Fastighetsprisindex för ' + searchDictMirror[this.county]
    this.description.textContent = 'Med utgångspunkt 1990'
    setTimeout(() => {
      window.scroll({
        top: 1000,
        left: 0,
        behavior: 'smooth'
      })
    }, 500)
  }

  get county () {
    return this.getAttribute('county')
  }
  /**
   * Generates new Chart.js on canvas
   * @param  {Object} data
   */
  async generateChart (data) {
    const ctx = this.chartCanvas.getContext('2d')
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.year,
        datasets: [
          {
            label: 'Fastighetsprisindex ' + searchDictMirror[this.county],
            data: data.salesPrice,
            borderColor: 'hsl(204, 86%, 53%)',
            borderWidth: 1
          },
          {
            label: 'Fastighetsprisindex hela Sverige',
            data: [
              100,
              107,
              97,
              86,
              90,
              91,
              91,
              98,
              107,
              117,
              130,
              140,
              149,
              159,
              174,
              191,
              212,
              235,
              242,
              246,
              264,
              266,
              263,
              272,
              291,
              322,
              349,
              378,
              378
            ],
            borderColor: 'rgba(0, 0, 0, 0.5)',
            borderWidth: 1
          }
        ]
      },
      options: {
        animation: {
          easing: 'easeOutBounce'
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    })
  }
}

customElements.define('fastighetspris-index', Fastighetsprisindex)
export { Fastighetsprisindex }
