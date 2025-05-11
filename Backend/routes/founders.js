const express = require('express');
const router = express.Router();
const Founder = require('../models/Founder');

// Get all founders
router.get('/', async (req, res) => {
  try {
    const founders = await Founder.find();
    res.json(founders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new founder
router.post('/', async (req, res) => {
  const founder = new Founder({
    name: req.body.name,
    title: req.body.title,
    bio: req.body.bio,
    photoUrl: req.body.photoUrl
  });

  try {
    const newFounder = await founder.save();
    res.status(201).json(newFounder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
