import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/");
const connectedClient = await client.connect(); //Make Connection -> Network call ✅

const db = connectedClient.db(`practiceDB`);
const collection = db.collection(`articles`);

//READ Operation
const articlesData = await collection.find().toArray();
console.log(articlesData);

// ----------------------------------------------------------------------------------------------------------------------------------------------------
client.close();
