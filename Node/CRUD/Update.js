import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/");
const connectedClient = await client.connect(); //Make Connection -> Network call ✅

const db = connectedClient.db(`School`); // create DB

const studentsCollection = db.collection(`students`);
const teachersCollection = db.collection(`teachers`);

// Update or Add Field
const updatedField = await teachersCollection.updateOne(
  {
    _id: new ObjectId("6a7591b623acc85eb912a321"),
  },
  { $set: { age: 100 } },
);

console.log(updatedField);

const addField = await teachersCollection.updateOne(
  {
    _id: new ObjectId("6a7591b623acc85eb912a321"),
  },
  { $set: { Subject: "MATHS" } },
);

console.log(addField);

//Update Whole Document
const replacedFeild = await teachersCollection.replaceOne(
  {
    _id: new ObjectId("6a7591b623acc85eb912a321"),
  },
  { name: "Kushaha", Section: "B2" },
);

console.log(replacedFeild);

// ----------------------------------------------------------------------------------------------------------------------------------------------------
client.close();
