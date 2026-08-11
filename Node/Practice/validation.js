import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/");
const connectedClient = await client.connect();

const db = connectedClient.db("todo");

// await db.command({
//   collMod: "tasks",
//   validator: {
//     $jsonSchema: {
//       required: ["title", "status"],
//       properties: {
//         _id: {
//           bsonType: "objectId",
//         },
//         title: {
//           bsonType: "string",
//           maxLength: 20,
//         },
//         status: {
//           bsonType: "string",
//         },
//       },
//       additionalProperties: false,
//     },
//   },
//   validationAction: "warn", // or Error
//   validationLevel: "moderate", //moderate(existing invalid doc can be modifed in any way) off or Strict (existing invalid doc cann't be modifed only corrected )
// });

// const collectionInfo = await db.listCollections({ name: "tasks" }).toArray();
// console.log(collectionInfo[0].options);

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Invalid Documents Count:

// const result = await db.command({
//   validate: "tasks",
// });
// console.log(result);

// Finding Invalid Documents in a Collection:

// $jsonSchema → valid documents & $nor + $jsonSchema → invalid documents

const collectionInfo = await db.listCollections({ name: "tasks" }).toArray();
const schema = collectionInfo[0].options.validator.$jsonSchema;
// console.log(schema);

const invalidDocs = await db
  .collection("tasks")
  .find({
    $nor: [
      {
        $jsonSchema: schema,
      },
    ],
  })
  .toArray();

console.log(invalidDocs);

//  ON SHELL ->
//  db.tasks
//   .find({
//     $nor: [
//       {
//         $jsonSchema: db.getCollectionInfos({ name: "tasks" })[0]
//           .options.validator.$jsonSchema,
//       },
//     ],
//   });

// client.close();

// Shell provides Exact error
