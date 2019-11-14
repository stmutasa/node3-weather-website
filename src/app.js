const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// Initiate express this way
const app = express();

// find port for heroku as environment variable called port
const port = process.env.PORT || 3000;

// Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// .set allows you to set up a value for a property. Here setup hbs which expects a "templates" folder in the root
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Serve up the true pathname of our directory with use
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Simi'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Simukayi Mutasa'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help!!',
        message: 'Take the red pill',
        name: 'Simi Mutasa'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        console.log(latitude, longitude, location);

        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecast,
                location,
                address: req.query.address
            })
        })
    })
});


app.get('/products', (req, res)=> {
    if (!req.query.search) {
        return res.send({
            error: "Provide a search term"
        })
    }
    res.send({
        products: []
    })
});

// Set up 404 pages
app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMessage: 'Help page not found'
    })
});

app.get('*', (req, res) => {
    res.render('error', {
        errorMessage: 'my 404 page'
    })
});

// Start the server by starting listen
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});