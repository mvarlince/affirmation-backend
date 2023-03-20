import db_connect from "./db_connect.js";
import {db_creds} from "./secrets.js"

export async function getAff(req, res){
    const db = db_connect()
    const result = await db.collection(db_creds.collection)
        .find({})
      .toArray()
    console.log(result)
    res.send(result)
}

export async function newAff(req, res) {
    const newDoc = req.body
    const db = db_connect()
    console.log('ser')
    await db.collection(db_creds.collection)
        .insertOne(newDoc)
        .catch(err => {
            res.status(500).send(err)
            return
        })
        .then( () => getAff(req, res))
    res.status(201).send({message:'Affirmation content inserted' })
}
