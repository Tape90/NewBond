const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose'); 
const multer = require('multer')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expressLimit = require('express-rate-limit');
require('dotenv').config()
const PORT = process.env.PORT;
app.use(cors());
app.use('/uploads', express.static('uploads'));


//limit requests to 100 per 15 minutes
const limiter = expressLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: "Too many requests from this IP, please try again in 15 minutes",
  });



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
    heart: Number
});

const Post = mongoose.model("Post", postSchema);

//create schema and model for user
const userSchema = new mongoose.Schema({
    fullname: {
      type: String,
      required: true,
      minlegth: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
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
    }
});

const User = mongoose.model("User", userSchema);





//home route
app.get("/",(req,res) => {
    res.send("hallo Welt");
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
  app.post("/api/register", limiter, async(req,res) => {
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
app.post("/api/login", async(req,res) => {
    const {email, password} = req.body;
    if(!email || !password){
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
        return res.status(401).send({message: "Password is not correct"});
    }
    //create jwt token
    const token = jwt.sign({id: existUser._id}, process.env.JWT_SECRET);
    res.status(200).send({token, message: "Login successful"});
})

//server running
app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})

