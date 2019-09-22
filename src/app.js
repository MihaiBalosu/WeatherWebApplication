const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static dir to serve
app.use(express.static(publicDirectoryPath))

app.get('', (require, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mihai Balosu'
    })
})

app.get('/about', (require, res) => {
    res.render('about', {
        title: 'About',
        name: 'Mihai Balosu'
    })
})

app.get('/help', (require, res) => {
    res.render('help', {
        helpText: 'Some help text',
        title: 'Help',
        name: 'Mihai Balosu'
    })
})

app.get('/weather', (require, res) => {
    if(!require.query.address){
        return res.send({
            error: 'Provide a location'
        })
    }else {
        geocode(require.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error){
               return res.send({ error })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({ error })
                }
                res.send({
                    location: location,
                    forecast: forecastData,
                    address: require.query.address
                })
            })
        })
    }
})

app.get('/products', (require, res) => {
    if(!require.query.search){
        return res.send({
            error: 'Provide search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*', (require, res) => {
    res.render('404page', {
        error: 'Help article not found',
        name: 'Mihai Balosu'
    } )
})

app.get('*', (require, res) => {
    res.render('404page', {
        error: 'Page not found',
        name: 'Mihai Balosu'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})