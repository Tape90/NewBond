const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose'); 
var path = require('path');
require('dotenv').config()
const PORT = process.env.PORT;

//routes
const postsRouter = require('./routes/posts');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login')
const passwordResetRouter = require('./routes/passwordReset');
const postActionRouter = require('./routes/postAction');



//serve static build folder
app.use(express.static(path.join(__dirname, '../frontend/dist/**')));

app.use('/uploads', express.static('uploads'));
app.use(cors());





//connect to db
app.use(async function(req,res,next) {
    await mongoose.connect(process.env.CONNECT_STRING,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    next()
})



//home route
app.get("/",(req,res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
})

//failure redirect
app.get("/failureRedirect", (req,res) => {
  res.status(200).send({message: "failure"});
})


//mount post router on base url /api/posts
app.use('/api/posts', postsRouter);

//use express for incoming payloads
app.use(express.json());
app.use("/api/register", registerRouter); //mount register router on base url /api/register

//mount login router on base url /api/login
app.use("/api/login",loginRouter);

//mount post like router on base url /api
app.use("/api",postActionRouter);

//mount password reset router on base url /api/auth/reset
app.use("/api/auth/reset",passwordResetRouter);



//server running
app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})

