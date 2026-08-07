import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/");
const connectedClient = await client.connect(); //Make Connection -> Network call ✅

const db = connectedClient.db(`School`); // create DB

const studentsCollection = db.collection(`students`); // Create Collection
const teachersCollection = db.collection(`teachers`); // Create Collection

const result1 = await studentsCollection.insertOne({
  name: "Hemant",
  age: 12,
  Section: "12A",
});

const result2 = await teachersCollection.insertMany([
  { name: "Ramu Sir", age: 45 },
  { name: "Jamu Sir", age: 50 },
]);

console.log(result1);
console.log(result2);

// ----------------------------------------------------------------------------------------------------------------------------------------------------
client.close();
