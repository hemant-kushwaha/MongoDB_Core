import { MongoClient } from "mongodb";



const client = new MongoClient("mongodb://localhost:27017/");
const connectedClient = await client.connect();

const db = connectedClient.db('todo');
const collection = db.collection('task');

// const cursor = collection.find(); // Async Iterator

// console.log(await cursor.hasNext());

// const data = await cursor.toArray();
// console.log(data);

// for await (const doc of cursor){
//     console.log(doc);
// }

// while(await cursor.hasNext()){
//     console.log(await cursor.next());
// }

// Normal For Loop will also work

// console.log(await cursor.hasNext());
// console.log(await collection.countDocuments());

const cursor = collection.find({},{ projection: { title: 1 } }).limit(5).skip(1).sort({title:1,}); // Async Iterator
console.log(await cursor.toArray());
 


client.close();

//NOTE:
// MongoDB Shell: -> find(filter, projection)
// Node.js Driver: -> find(filter, options)
