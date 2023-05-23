const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/userModel");
const Post = require("../models/postModel");

router.post("/:postId/like/", async (req, res) => {
  try {
    // Get post id from params
    const postId = req.params.postId;

    // Token validation
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    // Check if user already liked post
    const user = await User.findOne({ id: userId });
    console.log(user.likePostsId.includes(postId));
    if (!user.likePostsId.includes(postId)) {
      // Find post and increase heart count
      const post = await Post.findOneAndUpdate({ id: postId }, { $inc: { heart: 1 } });
      console.log(post);
      if (!post) {
        return res.status(404).send({ message: "Post not found" });
      }

      // Add post id to user's likePostsId array
      user.likePostsId.push(postId);
      await user.save();

      res.status(200).send({ message: "Post liked", post });
    } else {
      return res.status(409).send({ message: "User already liked post" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
