const express = require("express");
const http = require("https")
const app = express();
const { MongoClient } = require('mongodb');

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
  let options = {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/stocks',
    qs: {
      exchange: "NYSE",
      country: 'United States',
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

    console.log("response was:", obj);
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

app.get("/index", function (req, res) {
  return res.render("index.ejs");
});

app.get("/stock_list", function (req, res) {
  let options = {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/stocks',
    qs: {
      country: 'United States',
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

    console.log("response was:", obj);
    data = {
      values: obj.data
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

  console.log("data", data)
  return res.render("stock_list.ejs", data);
});

app.get("/buysell", function (req, res) {
  return res.render("buysell.ejs");
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




async function main() {
  const uri = "mongodb+srv://ianmyers236:XedmzskPQeGSWhwv@startrade.rm0jzcv.mongodb.net/";


  const client = new MongoClient(uri);

  try {
    await client.connect();

    await createUser(client, { user_id: "jstirest", name_first: "John", name_last: "Stiret", buying_power: 400, stocks: [{ 0: "TESL", 1: 1 }, { 0: "APPL", 1: 155 }] });
    //await updateUsersStocks(client, "imyers236", {stocks: [{0:"TESL", 1: 6}, {0:"APPL", 1: 100}]});
    //await updateUsersStocks(client, "imyers236", {buying_power: 400});
    //await deleteUser(client, "jstirest");
    //await findOneUserByUser_id(client, "jstiret");
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }

}

main().catch(console.error);


async function deleteUser(client, id) {
  const result = await client.db("StarTrade_DB").collection("Users").deleteOne({ user_id: id });


  console.log(`${result.deletedCount} document was deleted`);
}

async function updateBuyingPower(client, id, updateBuying_Power) {
  const result = await client.db("StarTrade_DB").collection("Users").updateOne({ user_id: id }, { $set: updateBuying_Power });

  console.log(`${result.matchedCount} document matched the query criteria`);
  console.log(`${result.modifiedCount} document was updated`);
}

async function updateUsersStocks(client, id, updateStocks) {
  const result = await client.db("StarTrade_DB").collection("Users").updateOne({ user_id: id }, { $set: updateStocks });

  console.log(`${result.matchedCount} document matched the query criteria`);
  console.log(`${result.modifiedCount} document was updated`);
}

async function findOneUserByUser_id(client, id) {
  const result = await client.db("StarTrade_DB").collection("Users").findOne({ user_id: id });

  if (result) {
    console.log(`Found a User in the collection with the id '${id}'`);
    console.log(result);
  }
  else {
    console.log(`No User in the collection with the id '${id}'`);
  }

}

async function createMultipleUsers(client, newUsers) {
  const result = await client.db("StarTrade_DB").collection("Users").insertMany(newUsers);

  console.log(`${result.insertCount} new users created with the following id(s):`);
  console.log(result.insertedIds);
}

async function createUser(client, newUser) {
  const result = await client.db("StarTrade_DB").collection("Users").insertOne(newUser);

  console.log(`New listing create with the following id: ${result.insertedId}`);
}

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => {
    console.log(`- ${db.name}`);
  });
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





app.listen(PORT, function () {
  console.log("Server listening on port " + PORT);
});