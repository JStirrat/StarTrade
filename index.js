const express = require("express");
const http = require("https")
const app = express();

//options for using the Twelve Data API
//TODO: remove api keys - terrible practice
const request = require('request');

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static("resources"));

app.set("view engine", "ejs");

const PORT = 3000;

let obj;
let data; 

app.get("/", function (req, res) {
    // let options = {
    //     method: 'GET',
    //     url: 'https://twelve-data1.p.rapidapi.com/stocks',
    //     qs: {
    //       exchange: "NYSE",
    //       country: 'United States',
    //       format: 'json'
    //     },
    //     headers: {
    //       'X-RapidAPI-Key': 'b998fb38e0msh5bdbc233f355651p1e58ccjsn9224f21113ce',
    //       'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
    //     }
    //   };

    let options = {
        method: 'GET',
        url: 'https://twelve-data1.p.rapidapi.com/time_series',
        qs: {
            symbol: 'AMZN',
            interval: '1day',
            outputsize: '30',
          format: 'json'
        },
        headers: {
          'X-RapidAPI-Key': 'b998fb38e0msh5bdbc233f355651p1e58ccjsn9224f21113ce',
          'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
        }
      };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      obj = JSON.parse(body);

      console.log(obj);
      data = {
        values: obj.values
    }

  });

//   data = {
//     symbol: obj.symbol,
//     name: obj.name,
//     currency: obj.currency,
//     exchange: obj.exchange,
//     mic_code: obj.mic_code,
//     country: obj.country,
//     type: obj.type
//   }

    //console.log("data", data)
    return res.render("\index", data);
});

app.get("/stock_list", function (req, res) {
    return res.render("\stock_list");
});

app.get("/index", function (req, res) {
    return res.render("index.ejs");
});

app.get("/stock_list", function (req, res) {
    return res.render("stock_list.ejs");
});


app.listen(PORT, function () {
    console.log("Server listening on port " + PORT);
});