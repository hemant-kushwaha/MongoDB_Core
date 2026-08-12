import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/");
const connectedClient = await client.connect();
console.log("DB Connected");

const db = connectedClient.db("transaction");
const users = db.collection("users");
const directories = db.collection("directories");

const session = client.startSession();
session.startTransaction();

try {
  await directories.insertOne({ name: "db", userName: "HK" }, { session });
  await users.insertOne({ name: "HK", rooDirName: "db" }, { session });

  await session.commitTransaction();
} catch (error) {
  //   console.log(error);
  await session.abortTransaction();
}

await connectedClient.close();
console.log("DB Disconnected");
