const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const limiter = require("express-rate-limit");

const User = require('../models/userModel');

//limit requests to 100 per 15 minutes
const limit = limiter({
    windowMs: 15 * 60 * 1000,
    max: 100
})


// POST /api/register
router.post('/',limit, async (req, res) => {
  const { id, fullname, email, password, role } = req.body;
  if (!id || !fullname || !email || !password || !role) {
    return res.status(404).send({ message: 'Please fill out all fields' });
  }
  // Überprüfe, ob der Benutzer bereits existiert
  const existsUser = await User.findOne({ email });
  if (existsUser) {
    return res.status(409).send({ message: 'User already exists' });
  }
  // Hash des Passworts
  const hashedPassword = await bcrypt.hash(password, 10);
  // Erstelle Benutzer mit Schema-Validierung
  const user = new User({
    id,
    fullname,
    email,
    password: hashedPassword,
    role,
  });

  try {
    await User.create(user);
    res.status(201).send({ message: 'User created' });
  } catch (error) {
    // Hier werden auch Validierungsfehler abgefangen
    res.status(500).send({ message: 'Something went wrong' });
  }
});

module.exports = router;