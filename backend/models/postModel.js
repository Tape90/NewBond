const mongoose = require('mongoose');

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
    },
    latitude: Number,
    longitude: Number,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
