import db_connect from "./db_connect.js";
import { db_creds } from "./secrets.js";
import { ObjectId } from "mongodb";

// export async function getAff(req, res){
//     const db = db_connect();
//     const result = await db.collection(db_creds.collection)
//         .find({})
//         .toArray()
//         .then((querySnapshot) => {
//             return querySnapshot.docs.map((doc) => {
//                 return {
//                     id: doc.id,
//                     data: doc.data(),
//                     createdAt: doc.createTime.toDate()
//                 };
//             });
//         });
//     console.log(result);
//     res.send(result);
// }

export async function getAff(req, res) {
  const db = db_connect();
  const result = await db
    .collection(db_creds.collection)
    .aggregate([
      {
        $addFields: {
          dateCreated: { $toDate: "$_id" },
        },
      },
    ])
    .toArray();
  console.log(result);
  res.send(result);
}

export async function newAff(req, res) {
  const newDoc = req.body;
  const db = db_connect();
  console.log("ser");
  await db
    .collection(db_creds.collection)
    .insertOne(newDoc)
    .then(() => getAff(req, res));
  // res.status(201).send({message:'Affirmation content inserted' })
}

export async function deleteDocument(req, res) {
  const id = { _id: new ObjectId(req.params.affid) };
  // const {docid} = req.params
  // Create a reference to the document to delete
  console.log(id);
  const db = db_connect();

  await db
    .collection(db_creds.collection)
    .deleteOne(id)
    .then(() => getAff(req, res));
  res.send("Aff deleted");
}
