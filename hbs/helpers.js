const hbs = require('hbs');
const axios = require('axios');


var config = {
    method: 'get',
    url: 'http://swapi.dev/api/people/1/',
};

// helpers
hbs.registerHelper('getyear', () => {
    return new Date().getFullYear();
***REMOVED***


hbs.registerHelper('api', () => {

    axios(config)
        .then(function(response) {
            console.log(response.data);

      ***REMOVED***)
        .catch(function(error) {
            console.log(error);

      ***REMOVED***);
***REMOVED***