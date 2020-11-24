const express = require('express');
const app = express();
const axios = require('axios');


const hbs = require('hbs');
require('./hbs/helpers');

//setup
const port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));

// Express HBS engine
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index');
});

//Listen Puerto
app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${ port }`);
});