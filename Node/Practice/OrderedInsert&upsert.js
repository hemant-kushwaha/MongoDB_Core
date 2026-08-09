import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/Upsert");
const connectedClient = await client.connect();

const db = connectedClient.db("todo");
const collection = db.collection("tasks");

//----------------------------------------------------------------------------------------------------------------------------------------------------

// Ordered Insert -> Default Ordered: true -> stop on first error
// const insertedDocuments = await collection.insertMany([
//   { title: "Task 26", status: "pending", priority: "high", completed: false },
//   {
//     _id: new ObjectId("6a78aa1d5dc7c69887b5f899"),
//     title: "Task 27",
//     status: "completed",
//     priority: "medium",
//     completed: true,
//   }, // Creating Error
//   {
//     title: "Task 28",
//     status: "in-progress",
//     priority: "low",
//     completed: false,
//   },
//   { title: "Task 29", status: "pending", priority: "medium", completed: false },
//   { title: "Task 30", status: "completed", priority: "high", completed: true },
// ]);

// ordered:false
// const insertedDocumentsUnOrdered = await collection.insertMany(
//   [
//     { title: "Task 26", status: "pending", priority: "high", completed: false },
//     {
//       _id: new ObjectId("6a78aa1d5dc7c69887b5f899"),
//       title: "Task 27",
//       status: "completed",
//       priority: "medium",
//       completed: true,
//     }, // Creating Error
//     {
//       title: "Task 28",
//       status: "in-progress",
//       priority: "low",
//       completed: false,
//     },
//     {
//       title: "Task 29",
//       status: "pending",
//       priority: "medium",
//       completed: false,
//     },
//     {
//       title: "Task 30",
//       status: "completed",
//       priority: "high",
//       completed: true,
//     },
//   ],
//   { ordered: false },
// );

//----------------------------------------------------------------------------------------------------------------------------------------------------
//UPSERT : TRUE -> Inserted The documents if not availble

const upsertedDocuments = await collection.updateOne(
  { title: "Task 31" },
  { $set: { status: "pending" } },
  { upsert: true }, ///
);

//----------------------------------------------------------------------------------------------------------------------------------------------------

client.close();
