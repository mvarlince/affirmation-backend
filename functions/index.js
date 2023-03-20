import express from "express";
import cors from "cors"
import functions from "firebase-functions"
import { getAff, newAff } from "./function.js";

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req,res) => {
    res.send('serrr')
})
app.get('/getaff',getAff)
app.post('/newaff', newAff)

export const api = functions.https.onRequest(app)