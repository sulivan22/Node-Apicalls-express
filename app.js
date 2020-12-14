const express = require("express");
const app = express();
const axios = require("axios");
const convert = require("xml-js");
const fetch = require("node-fetch");

const hbs = require("hbs");
require("./hbs/helpers");

//setup
const port = process.env.PORT || 3000;
app.use(express.static(__dirname + "/public"));

// Express HBS engine
hbs.registerPartials(__dirname + "/views/parciales");
app.set("view engine", "hbs");

app.get("/", async (req, res) => {
  // dataAsJson is an object
  let dataAsJson = {};
  let error = null;

  // https://zellwk.com/blog/async-await-express/
  try {
    // https://www.valentinog.com/blog/http-js/#making-http-requests-with-nodejs-the-node-fetch-module
    const response = await fetch(
      `https://www.voipinfocenter.com/API/Request.ashx?command=getuserinfo&username=XXXXXXX&password=xxxxxx&customer=xxxxxxx`
    );

    // Get the HTTP response body
    const responseBodyText = await response.text();

    // https://stackoverflow.com/a/53965331/670400
    dataAsJson = JSON.parse(convert.xml2json(responseBodyText));
  } catch (err) {
    console.error(err);
    error = err;
  }

  // This is an example of what the structure of `json` is:
  //
  // {
  //   "declaration": { "attributes": { "version": "1.0" } },
  //   "elements": [
  //     { "type": "doctype", "doctype": "GetUserInfo" },
  //     {
  //       "type": "element",
  //       "name": "GetUserInfo",
  //       "elements": [
  //         {
  //           "type": "element",
  //           "name": "Customer",
  //           "elements": [{ "type": "text", "text": "sulivan*call2casa" }]
  //         },
  //         {
  //           "type": "element",
  //           "name": "Balance",
  //           "elements": [{ "type": "text", "text": "975" }]
  //         },
  //         {
  //           "type": "element",
  //           "name": "SpecificBalance",
  //           "elements": [{ "type": "text", "text": "975.00166" }]
  //         },
  //         {
  //           "type": "element",
  //           "name": "Blocked",
  //           "elements": [{ "type": "text", "text": "False" }]
  //         },
  //         {
  //           "type": "element",
  //           "name": "EmailAddress",
  //           "elements": [{ "type": "text", "text": "sulivan22@gmail.com" }]
  //         },
  //         {
  //           "type": "element",
  //           "name": "GeocallCLI",
  //           "elements": [{ "type": "text", "text": "+34914276497" }]
  //         }
  //       ]
  //     }
  //   ]
  // }

  if (error) {
    res.render("index", {
      api: "This is the api",
      getyear: "2020",
      errorMessage: error ? error.message : "An unknown error occurred",
    });
  } else {
    console.log("JSON: ", Object.keys(dataAsJson));
    console.log("JSON: ", JSON.stringify(dataAsJson["elements"]));
    const customerElement = dataAsJson.elements[1].elements.find(
      (element) => element.name === "Customer"
    );
    const balanceElement = dataAsJson.elements[1].elements.find(
      (element) => element.name === "Balance"
    );
    const blockedElement = dataAsJson.elements[1].elements.find(
      (element) => element.name === "Blocked"
    );
    const emailAddressElement = dataAsJson.elements[1].elements.find(
      (element) => element.name === "EmailAddress"
    );
    const geoCallCLIElement = dataAsJson.elements[1].elements.find(
      (element) => element.name === "GeocallCLI"
    );

    const customerData = {
      customerName: customerElement ? customerElement.elements[0].text : null,
      balance: balanceElement ? balanceElement.elements[0].text : null,
      blocked: blockedElement ? blockedElement.elements[0].text : null,
      emailAddress: emailAddressElement
        ? emailAddressElement.elements[0].text
        : null,
      geoCallCLI: geoCallCLIElement ? geoCallCLIElement.elements[0].text : null,
    };

    console.log("customerData", customerData);

    // https://www.geekstrick.com/create-website-with-handlebars-express-nodejs/#Bind_Data_To_Template
    res.render("index", {
      api: "This is the api",
      getyear: "2020",

      customerData: customerData,
    });
  }
});

//Listen Puerto
app.listen(port, () => {
  console.log(`Escuchando peticiones en el puerto ${port}`);
});
