const fetch = require('node-fetch')
const URL =
    'http://api.scb.se/OV0104/v1/doris/sv/ssd/BO/BO0501/BO0501A/FastpiPSLanAr'

/** 
 * Fetching real estate price index history from SCB for requested county
 * @param  {number} county see ./js/fpiApp/searchDict.js for county codes
 * @returns {Object}
 */
async function getIndexHistory (county) {
    try {
        const response = await fetch(URL, {
            method: 'POST',
            body: JSON.stringify({
                query: [
                    {
                        code: 'ContentsCode',
                        selection: {
                            filter: 'item',
                            values: ['BO0501R5']
                        }
                    },
                    {
                        code: 'Lan',
                        selection: {
                            filter: 'item',
                            values: [county]
                        }
                    }
                ],
                response: { format: 'json-stat' }
            })
        })
        const body = await response.json()
        return generateApiResponseObject(body)
    } catch (e) {
        throw new Error(e)
    }
}
/**
 * Parses the response and returns an object
 * better suited for chart generation
 * @param  {Object} rawResponse parsed JSON response from SCB
 * @returns {Object}
 */
function generateApiResponseObject (rawResponse) {
    const rawStats = {
        label: rawResponse.dataset.dimension.Tid.category.label,
        value: rawResponse.dataset.value
    }

    const salePrice = []
    const year = []

    let i = 0
    for (const item in rawStats.label) {
        year.push(item)
        salePrice.push(rawStats.value[i])
        i++
    }

    return {
        salesPrice: salePrice,
        year: year
    }
}

module.exports = getIndexHistory
