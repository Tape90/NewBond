const passport = require("passport");
const express = require('express');
const router = express.Router();
require("../passportSetup");

// Set up the Google OAuth routes
router.get('/', passport.authenticate('google', { scope: ['profile'] }),(req,res) => {
    res.status(200).send({message: "success"});
});

router.get('/callback',
  passport.authenticate('google', { failureRedirect: '/failureRedirect' }),
  (req, res) => {
    // Redirect the user to the frontend's success page or perform any other necessary actions.
    res.status(200).send({message: "success"});
  }
);