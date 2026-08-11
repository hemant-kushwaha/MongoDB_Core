import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/");
const connectedClient = await client.connect();

const db = connectedClient.db("test");
const collection = db.collection("fruits");

// const collectionList = await db.listCollections({ name: "fruits" }).toArray();
// console.log(collectionList[0].options)

// try {
//   await collection.insertOne({
//     name: "Pineapple",
//     color: "Yellow",
//     price: 90,
//   });
// } catch (err) {
//   console.log(err);
// }

//BASIC VAlIDATION

// await db.command({
//   collMod: "fruits",
//   validator: {
//     name: {
//       $type: "string",
//     },
//     colour: {
//       $type: "string",
//     },
//     price: {
//       $type: "number",
//       $gte: 10,
//     },
//   },
// });

// VALIDATION DURING NEW Collection Creation

await db.command({
  create: "Vegeis",
  validator: {
    name: {
      $type: "string",
    },
    colour: {
      $type: "string",
    },
    price: {
      $type: "number",
      $gte: 10,
    },
  },
});

await db.createCollection("Fastfood", {
  validator: {
    name: {
      $type: "string",
    },
    colour: {
      $type: "string",
    },
    price: {
      $type: "number",
      $gte: 10,
    },
  },
});

client.close();
