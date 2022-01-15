const request = require('request');

module.exports = geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2lsdTEwIiwiYSI6ImNreTVlOGdtMDBqZXMyb295MjJoNTRsenAifQ.ccN4MNI6LFtpYdUXunVPbA&limit=1'
    
    request({ url, json: true }, (error, { body }) => {
        if (error)
            return callback('Unable to connect to location services!');
        
        if (body.features.length == 0)
            return callback('Unable to find location. Try another search.');
        
        callback(undefined, {
            longitude: body.features[0].center[0],
            latitude: body.features[0].center[1],
            location: body.features[0].place_name
        });
    });
}