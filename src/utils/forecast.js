const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/667b68b7492a4d1a27b7a89e533e8ebd/' + latitude +',' + longitude + '?units=si'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect', undefined)
        }else if( body.error){
            callback('Unable to find location', undefined)
        }else {
            callback(undefined, body.daily.data[0].summary + " With temperature " +  body.currently.temperature + ' celsius degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.' )
        }
    })

}

module.exports = forecast
