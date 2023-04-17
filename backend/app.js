const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const PORT = process.env.PORT;
app.use(cors());

app.get("/",(req,res) => {
    res.send("hallo Welt");
})

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})