const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const address = process.argv[2];

if (!address) {
    return console.error('Please provide a location');
}

geocode(address, (error, { longitude, latitude, location } = {}) => {
    if (error)
        return console.error('Error:', error);

    forecast(longitude, latitude, (error, forecastData) => {
        if (error)
            return console.error('Error:', error);
        
        console.log(location);
        console.log(forecastData);
    });
});