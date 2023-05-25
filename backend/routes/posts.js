const express = require('express');
const multer = require('multer');
const axios = require('axios');
const router = express.Router();

const Post = require("../models/postModel")

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// POST /api/posts
router.post('/', upload.single('image'), async (req, res) => {
  console.log(req);
  const { id, title, location, instagramLink, price, heart } = req.body;
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;


  //req to nominatim 
  const geocodeUrl = `https://nominatim.openstreetmap.org/search/${encodeURIComponent(location)}?format=json`;
  const resp = await axios.get(geocodeUrl);
    if(resp.status === 200 && resp.data.length > 0) {
   
    const result = resp.data[0];
    let {lat,lon} = result;
    lat = parseFloat(lat);
    long = parseFloat(lon);
  
    const post = new Post({ id, title, location, instagramLink, price, imageUrl, heart, latitude: lat, longitude: lon});

  
    try {
      const newPost = await Post.create(post);
      res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  } else {
    res.status(404).send({message: "Location no found!"});
  }
});

// GET /api/posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;