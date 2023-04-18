const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose'); 
require('dotenv').config()
const PORT = process.env.PORT;
app.use(cors());

app.use(cors());
app.use(express.json())

app.use(async function(req,res,next) {
    await mongoose.connect(process.env.CONNECT_STRING);
    next()
})


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    userName: String,
    password: String,
})

const User = mongoose.model('user',userSchema)

app.get("/users",async(req,res) => {
    res.send({
        empty: "currently"
    })
})

app.get("/",(req,res) => {
    res.send("hallo Welt");
})

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})