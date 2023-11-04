const express = require("express");
const http = require("https")
const app = express();

//options for using the Twelve Data API
//TODO: remove api keys - terrible practice
const request = require('request');

// let options = {
//   method: 'GET',
//   url: 'https://twelve-data1.p.rapidapi.com/stocks',
//   qs: {
//     country: 'United States',
//     symbol: 'AAPL',
//     format: 'json'
//   },
//   headers: {
//     'X-RapidAPI-Key': 'b998fb38e0msh5bdbc233f355651p1e58ccjsn9224f21113ce',
//     'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
//   }
// };

// request(options, function (error, response, body) {
// 	if (error) throw new Error(error);

// 	console.log(body);
// });

let options = {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/price',
    qs: {
      outputsize: '30',
      symbol: 'AAPL',
      format: 'json'
    },
    headers: {
      'X-RapidAPI-Key': 'b998fb38e0msh5bdbc233f355651p1e58ccjsn9224f21113ce',
      'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
    }
  };

  let test;
  
  request(options, function (error, response, body) {
      if (error) throw new Error(error);
      test = body;

      console.log({'price':body});
  });

app.use(express.urlencoded({
    extended: true
}));

app.set("view engine", "ejs");

const PORT = 3000;

app.get("/", function (req, res) {
    return res.render("\index");
});

app.listen(PORT, function () {
    console.log("Server listening on port " + PORT);
});