const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();


const User = require('../models/userModel');

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(404).send({ message: "Please fill out all fields" });
    }

    try {
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).send({ message: "User does not exist" });
        }

        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (!isPasswordCorrect) {
            return res.status(401).send({ message: "Password is incorrect" });
        }

        // Create JWT token
        const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET);

        res.status(200).send({ token, message: "Login successful" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Something went wrong" });
    }
});

module.exports = router;
