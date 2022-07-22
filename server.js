require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

const cors = require('cors');
const{SERVER_PORT}=process.env;
const {addEntry, getEntries, deleteEntry} = require('./controller')

app.use(cors());


app.use(express.json())
console.log(__dirname)
app.use("/styles", express.static( path.join(__dirname, "public", "index.css")))
app.use(express.static(path.join(__dirname, "public")))
app.use("/js", express.static(path.join(__dirname, "public", "index.js")))



app.post('/entry', addEntry)
app.post(`/entries`, getEntries)
app.delete(`/entries/:id`, deleteEntry)

app.listen(SERVER_PORT, ()=> console.log(`server running on ${SERVER_PORT}`))