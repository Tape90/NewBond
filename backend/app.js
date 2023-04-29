const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose'); 
const multer = require('multer')
const bcrypt = require('bcrypt');
require('dotenv').config()
const PORT = process.env.PORT;
app.use(cors());
app.use('/uploads', express.static('uploads'));




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
    id: String,
    fullname: String,
    email: String,
    password: String,
    matriculationCertificate: String,
    role: String
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
app.post("/api/register", async (req, res) => {

  console.log(req.body);

  const { id, fullname, email, password,role } = req.body;
  console.log(id,fullname,email,password,role)
  if (!id || !fullname || !email || !password || !role) {
      console.log("Please provide all fields");
      return res.sendStatus(400).send({message: "Please provide all fields"});
  }
  //does user already exist in db?
  const existUser = await User.findOne({ email });
  if(existUser) {
      console.log("User already exists");
      return res.status(409).send({message: "User already exists"});
  }
  // else {
  //   //create new user
  //   //hash password with bcrypt salt 10
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ id, fullname, email, password: hashedPassword,role });
    try {
      const newUser = await User.create(user);
      console.log("User created");
      res.status(201).send({message: "User created"});
    } catch (error) {
      console.error(error);
      res.status(500).send({message: "Server error"});
    }
});



//server running
app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})

