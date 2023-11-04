const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://ianmyers236:XedmzskPQeGSWhwv@startrade.rm0jzcv.mongodb.net/";


    const client = new MongoClient(uri);

    try {
        await client.connect();
        
        await createUser(client, {user_id: "jstirest", name_first: "John", name_last: "Stiret", buying_power: 400, stocks: [{0:"TESL", 1: 1}, {0:"APPL", 1: 155}]});
        //await updateUsersStocks(client, "imyers236", {stocks: [{0:"TESL", 1: 6}, {0:"APPL", 1: 100}]});
        //await updateUsersStocks(client, "imyers236", {buying_power: 400});
        //await deleteUser(client, "jstirest");
        //await findOneUserByUser_id(client, "jstiret");
    }   catch (e) {
        console.error(e);
    }   finally {
        await client.close();
    }

} 

main().catch(console.error);


async function deleteUser(client, id)
{
    const result = await client.db("StarTrade_DB").collection("Users").deleteOne({user_id: id});


    console.log(`${result.deletedCount} document was deleted`);
}

async function updateBuyingPower(client, id, updateBuying_Power)
{
    const result = await client.db("StarTrade_DB").collection("Users").updateOne({user_id: id}, {$set: updateBuying_Power});

    console.log(`${result.matchedCount} document matched the query criteria`);
    console.log(`${result.modifiedCount} document was updated`);
}

async function updateUsersStocks(client, id, updateStocks)
{
    const result = await client.db("StarTrade_DB").collection("Users").updateOne({user_id: id}, {$set: updateStocks});

    console.log(`${result.matchedCount} document matched the query criteria`);
    console.log(`${result.modifiedCount} document was updated`);
}

async function findOneUserByUser_id(client, id)
{
    const result = await client.db("StarTrade_DB").collection("Users").findOne({user_id: id});

    if (result)
    {
        console.log(`Found a User in the collection with the id '${id}'`);
        console.log(result);
    }
    else
    {
        console.log(`No User in the collection with the id '${id}'`);
    }

}

async function createMultipleUsers(client, newUsers)
{
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