const express = require('express');
***REMOVED***
const axios = require('axios');


const hbs = require('hbs');
require('./hbs/helpers');

***REMOVED***
***REMOVED***
app.use(express.static(__dirname + '/public'));

***REMOVED***
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index');
***REMOVED***

***REMOVED***
***REMOVED***
    console.log(`Escuchando peticiones en el puerto ${ port }`);
***REMOVED***