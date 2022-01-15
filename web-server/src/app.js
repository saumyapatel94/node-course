const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Saumya Patel'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Saumya Patel'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help text',
        title: 'Help',
        name: 'Saumya Patel'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address)
        return res.send({
            error: 'Adress must be provided'
        });

    geocode(req.query.address, (error, {
        longitude,
        latitude,
        location
    } = {}) => {
        if (error)
            return res.send({
                error
            });

        forecast(longitude, latitude, (error, forecastData) => {
            if (error)
                return res.send({
                    error
                });

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search)
        return res.send({
            error: 'You must provide a search term'
        });

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Saumya Patel',
        errorMessage: 'Help article not found'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Saumya Patel',
        errorMessage: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});