const request = require('postman-request')
require('dotenv').config()

const url = `http://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query=37.8267,-122.4233&units=f`

request({ url: url, json: true }, (error, response) => {
  const weather = response.body.current
  console.log(
    `${weather.weather_descriptions[0]}. It is currently ${weather.temperature} degrees out. It feels like ${weather.feelslike} degrees out.`
  )
})
