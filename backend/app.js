const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose'); 
const multer = require('multer')
require('dotenv').config()
const PORT = process.env.PORT;
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(cors());
// app.use(express.json())


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
});
  
const upload = multer({ storage });

app.use(async function(req,res,next) {
    await mongoose.connect(process.env.CONNECT_STRING,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    next()
})



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

app.get("/users",async(req,res) => {
    res.send({
        empty: "currently"
    })
})

app.get("/",(req,res) => {
    res.send("hallo Welt");
})

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
app.get("/api/posts", async (req, res) => {
    try {
      const posts = await Post.find();
      res.send(posts);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
});

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})

