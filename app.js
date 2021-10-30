const request = require('postman-request')
require('dotenv').config()

const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=37.8267,-122.4233&units=f`
const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/Salt%20Lake%20City.json?access_token=${process.env.MAPBOX_API_KEY}`

// request({ url: url, json: true }, (error, response) => {
//   if (error) {
//     console.log('Unable to connect to weather service!')
//   } else if (response.body.error) {
//     console.log('Unable to find location!')
//   } else {
//     const weather = response.body.current
//     console.log(
//       `${weather.weather_descriptions[0]}. It is currently ${weather.temperature} degrees out. It feels like ${weather.feelslike} degrees out.`
//     )
//   }
// })

request({ url: geoUrl, json: true }, (error, response) => {
  if (error) {
    console.log('Unable to connect to location services!')
  } else if (response.body.features.length === 0) {
    console.log('No matching search results!')
  } else {
    const latitude = response.body.features[0].center[1]
    const longitude = response.body.features[0].center[0]
    console.log(latitude, longitude)
  }
})
