require('dotenv').config()
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const router = express.Router();

const User = require("../models/userModel");

//send email with code for reset password
router.post("/", async(req,res,next) => {
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
  
  //reset password route
router.post("/newPassword", async(req,res) => {
    const password = req.body.password;
    const token = req.headers.authorization.split(" ")[1];
    if(!password || !token){
      res.status(404).send({message: "Unvalid input"});
    }
    console.log(process.env.JWT_SECRET);
    console.log(token)
    try {
      ;
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decodedToken);
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

module.exports = router;