import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/");
const connectedClient = await client.connect(); //Make Connection -> Network call ✅

const db = connectedClient.db(`School`); // create DB

const studentsCollection = db.collection(`students`);
const teachersCollection = db.collection(`teachers`);

//Delete Collection
// console.log(await studentsCollection.drop());

// Delete Document
const deletedDoc = await teachersCollection.deleteOne({
  _id: new ObjectId("6a7590f7c40fbb656f610282"),
});

//Delete a field or Property
const deletedField = await teachersCollection.updateOne(
  {
    _id: new ObjectId("6a7590f7c40fbb656f610283"),
  },
  { $unset: { age: "  " } },
);

console.log(deletedField);

// Delete DB
console.log(await db.dropDatabase());
// ----------------------------------------------------------------------------------------------------------------------------------------------------
client.close();
