const request = require('request');

module.exports = forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7b5c2f0ef1ff73acbac66d45a61f005d&query=' + latitude + ',' + longitude + '&units=m';

    request({ url, json: true }, (error, { body }) => {
        if (error)
            return callback('Unable to connect to weather service!');

        if (body.error) {
            return console.error('Unable to find location. Try another search.');
        }

        callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. Humidity is ' + body.current.humidity + '%.');
    });
}