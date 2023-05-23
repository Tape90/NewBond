const mongoose = require('mongoose');

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


module.exports = User;