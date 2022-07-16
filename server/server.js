require('dotenv').config();
const express = require('express');
const app = express();

const cors = require('cors');
const{SERVER_PORT}=process.env;
const {addEntry} = require('./controller')

app.use(cors());

app.use(express.json());

app.post('http://localhost:4000/entry', addEntry)

app.listen(SERVER_PORT, ()=> console.log(`server running on ${SERVER_PORT}`))