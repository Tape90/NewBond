const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose'); 
const passport = require("passport");
//cookie session
const cookieSession = require("cookie-session");

require('dotenv').config()
const PORT = process.env.PORT;

//routes
const postsRouter = require('./routes/posts');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login')
const passwordResetRouter = require('./routes/passwordReset');
const postActionRouter = require('./routes/postAction');
// const ssoAuthRouter = require('./routes/ssoAuth');

app.use('/uploads', express.static('uploads'));

//cookie session config
app.use(cookieSession({
  name: "session",
  keys: [process.env.COOKIE_KEY],
  maxAge: 24 * 60 * 60 * 1000 //24 hours  
}))

//passport config
app.use(passport.initialize());
app.use(passport.session());



//connect to db
app.use(async function(req,res,next) {
    await mongoose.connect(process.env.CONNECT_STRING,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    next()
})


require("./passportSetup");
app.use(cors());
// Set up the Google OAuth routes
app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get(
  '/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/failureRedirect' }),
  (req, res) => {
    // Redirect the user to the frontend's success page or perform any other necessary actions.
    res.status(200).send({message: "success"});
  }
);

//home route
app.get("/",(req,res) => {
    res.send("hallo Welt");
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

