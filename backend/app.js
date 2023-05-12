const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose'); 
const multer = require('multer')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
//passport
const passport = require("passport");
//cookie session
const cookieSession = require("cookie-session");


//JSON WEB TOKEN
const jwt = require("jsonwebtoken");
//express limit
const limiter = require("express-rate-limit");
require('dotenv').config()
const PORT = process.env.PORT;

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

//limit requests to 100 per 15 minutes
const limit = limiter({
    windowMs: 15 * 60 * 1000,
    max: 100
})


// multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
});
  
const upload = multer({ storage });

//connect to db
app.use(async function(req,res,next) {
    await mongoose.connect(process.env.CONNECT_STRING,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    next()
})


//create schema and model for post
const postSchema = new mongoose.Schema({
    id: String,
    title: String,
    location: String,
    instagramLink: String,
    price: String,
    imageUrl: String,
    heart: {
      type: Number,
      default: 0
    }
});

const Post = mongoose.model("Post", postSchema);

//create schema and model for user
const userSchema = new mongoose.Schema({
    fullname: {
      type: String,
      required: true,
      unique: true,
      minlegth: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlegth: 8,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      minlegth: 5,
      maxlength: 255,
    },
    matriculationFile: String,
    id: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      enum: ["student", "parent", "admin"]
    },
    likePostsId: {
      type: Array,
      default: []
    }
});

const User = mongoose.model("User", userSchema);

//passportSetup
require("./passportSetup");

const corsOptions = {
  origin: ['http://localhost', 'http://127.0.0.1:5173', 'http://localhost:3001'],
};

app.use(cors(corsOptions));
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


//create post route
app.post("/api/posts", upload.single("image"), async (req, res) => {
  console.log(req);
  const { id, title, location, instagramLink, price,heart } = req.body;
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  const post = new Post({id, title, location, instagramLink, price, imageUrl,heart });
  try {
    const newPost = await Post.create(post);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

//get all posts route
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


//create user route /register look if user already exists and if not create new user with bcrypt password in db
app.use(express.json());
try {
  app.post("/api/register", limit, async(req,res) => {
      const {id, fullname, email, password, role} = req.body;
      if(!id || !fullname || !email || !password || !role){
          return res.status(404).send({message: "Please fill out all fields"});
      } 
    //check if user already exists
    const existsUser = await User.findOne({email});
    if(existsUser){
        return res.status(409).send({message: "User already exists"});
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //create user with schema validation
      const user = new User({id, fullname, email, password: hashedPassword, role});

    try{
        await User.create(user);
        res.status(201).send({message: "User created"});
    } catch(error){
      //also validation errors are catched here
      res.status(500).send({message: "Something went wrong"});
    }
  })
} catch (error) {
  res.status(500).send(error);
}

// Login route to send post request with email and password and check if user exists and if password is correct and to send back jwt token
app.post("/api/login", async(req, res) => {
  const { email, password } = req.body;
  if (!email || !password){
    return res.status(404).send({message: "Please fill out all fields"});
  }
  //check if user exists
  const existUser = await User.findOne({email});
  if(!existUser){
    return res.status(401).send({message: "User does not exist"});	
  }
  //check if password is correct
  const isPasswordCorrect = await bcrypt.compare(password, existUser.password);
  if(!isPasswordCorrect){
    return res.status(401).send({message: "Password is incorrect"});
  }
  //create jwt token
  const token = jwt.sign({id: existUser.id}, process.env.JWT_SECRET);
  res.status(200).send({token,message: "Login successful"});
});

app.post("/api/:postId/like", async(req,res) => {
  try {
    //get post id from params
    const postId = req.params.postId;
    //Token validation

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    //check if user already liked post
    const user = await User.findOne({id: userId});
    console.log(user.likePostsId.includes(postId))
    if(!user.likePostsId.includes(postId)){
        //find post and increase heart count
      const post = await Post.findOneAndUpdate({id:postId}, {$inc: {heart: 1}});
      console.log(post);
      if(!post){
        return res.status(404).send({message: "Post not found"});
      }
      //add post id to user likePostsId array
      await user.likePostsId.push(postId);
      await user.save();
      res.status(200).send({message: "Post liked", post});
  } else {
      return res.status(409).send({message: `User already liked post`});
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({message: "Internal Server Error"});
  }
});


app.post("/api/auth/reset", async(req,res,next) => {
  //get email from body
  
  const {email} = req.body;
  console.log(email)
  if(!email) {
    return res.status(404).send({message: "Please fill out all fields"});
    
  }
  //check if email exists
  try {
    const userExist = await User.findOne({email: email});
    console.log(userExist);
    if(!userExist){
      return res.status(401).send({message: "User does not exist"});
    }

      //create unique 6 digit code
      const code = Math.floor(100000 + Math.random() * 900000);
      //send email to all possible email engines with code
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Reset Password",
        text: `Your reset code is ${code}`
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if(error){
          console.log(error);
          return res.status(500).send({message: "Internal Server Error"});
        } else {
          console.log("Email sent: " + info.response);
          //set token with email
          const token = jwt.sign({email: email}, process.env.JWT_SECRET);
          return res.status(200).send({message: "Email sent",token:token, code});
        }
      }
      )
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
})

app.post("/api/auth/reset/newPassword", async(req,res) => {
  const password = req.body.password;
  const token = req.headers.authorization.split(" ")[1];
  if(!password || !token){
    res.status(404).send({message: "Unvalid input"});
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const existUser = User.findOne({email: decodedToken.email});
    if(!existUser){
      return res.status(409).send({message: "User does not exist"});
  }
  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  //update user password
  const user = await User.findOneAndUpdate({email: decodedToken.email}, {password: hashedPassword});
  if(!user){
    return res.status(404).send({message: "User not found"});
  }
    res.status(200).send({message: "Password updated!"});
  } catch (error) {
    console.log(error);
    res.status(500).send({message: "Internal Server Error"});
  }

})



//server running
app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})

