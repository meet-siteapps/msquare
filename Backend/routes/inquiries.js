const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const auth = require('../middleware/auth');

// Submit an inquiry (public)
router.post('/', async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body);
    await inquiry.save();
    res.status(201).json({ message: 'Inquiry submitted' });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting inquiry' });
  }
});

// Get all inquiries (admin-only)
router.get('/', auth, async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inquiries' });
  }
});

module.exports = router;