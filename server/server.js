require('dotenv').config();
const express = require('express');
const app = express();

const cors = require('cors');
const{SERVER_PORT}=process.env;
const {addEntry, getEntries, deleteEntry} = require('./controller')

app.use(cors());

app.use(express.json());

app.post('/entry', addEntry)
app.post(`/entries`, getEntries)
app.delete(`/entries/:id`, deleteEntry)

app.listen(SERVER_PORT, ()=> console.log(`server running on ${SERVER_PORT}`))