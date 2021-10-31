const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
require('dotenv').config()

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Da Weather',
    name: 'Jeran Burget',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Jeran Burget',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Jeran Burget',
    message: 'Come here for some help!... Eventually.',
  })
})

app.get('/weather', ({ query: { address } }, res) => {
  if (!address) {
    return res.send({
      error: 'You must provide an address!',
    })
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        })
      }

      res.send({
        forecast: forecastData,
        location,
        address,
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term.',
    })
  }

  console.log(req.query.search)
  res.send({
    products: [],
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Error 404',
    name: 'Jeran Burget',
    error: 'Help article not found.',
  })
})

app.get('/*', (req, res) => {
  res.render('404', {
    title: 'Error 404',
    name: 'Jeran Burget',
    error: 'Page not found.',
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})
