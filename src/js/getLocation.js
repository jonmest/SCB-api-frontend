import { searchDict, searchDictMirror } from './searchDict.js'
const apiKey = 'AIzaSyAaKuNoyI64JLUYMPU5lsMo4rJq5uys8MM'
async function getLocation (element) {
    try {
        if ('geolocation' in navigator) {
            const loc = new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject)
            })
        
            return getCounty(await loc)
          } else {
            // geolocation not available
            return
          }
    } catch (error) {
        throw new Error(error)
    }

}

async function getCounty (location) {
  const coords = `${location.coords.latitude},${location.coords.longitude}`
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords}&key=${apiKey}`
  console.log(url)

  const response = await fetch(url)
  const data = await response.json()
  let county = await data.results[0].address_components[4].short_name

  if (county === 'Kalmar län' || county === 'Gotlands län') {
    county = 'Kalmar och Gotlands län'
  }

  return county
}

export { getLocation }
