import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/");

//Make Connection -> Network call ✅
const connectedClient = await client.connect();

console.log(client === connectedClient);

// ----------------------------------------------------------------------------------------------------------------------------------------------------

// Take DB Access -> No network call ❌
const db = connectedClient.db(`practiceDB`); // db() method returns a Database object.
console.log(db.databaseName);

// Take Admin Database Access
const Admin = db.admin();

// Show all dbs -> Network call ✅
const alldbs = await Admin.listDatabases();
console.log(alldbs); // Object which has databases array

// ----------------------------------------------------------------------------------------------------------------------------------------------------
//List Collection ->Network call ✅
const collectionList = await db.listCollections().toArray();
console.log(collectionList);

// Take Collection Access -> No network call ❌
const collection = db.collection(`articles`);

//Take documents of collection -> Network call ✅
const documentsOfArticleCollection = await collection.find().toArray();
console.log(documentsOfArticleCollection);

// ----------------------------------------------------------------------------------------------------------------------------------------------------
client.close(); // otherwise it will remain open forever
// ----------------------------------------------------------------------------------------------------------------------------------------------------
//NOTE: Where Promise is getting returned then there is network call
