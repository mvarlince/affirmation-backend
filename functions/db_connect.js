import { MongoClient } from "mongodb";
import {db_creds}  from './secrets.js'

export default function db_connect(){
    const client = new MongoClient(db_creds.uri)

    return client.db(db_creds.db)
}