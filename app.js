const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
require('dotenv').config()

geocode('New York', (error, data) => {
  if (error) {
    console.log('Error: ', error)
  } else {
    console.log('Data: ', data)
  }
})

forecast(40.7306, -73.9866, (error, data) => {
  if (error) {
    console.log('Error: ', error)
  } else {
    console.log('Data: ', data)
  }
})
