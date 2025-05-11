const express = require('express');
const router = express.Router();
const multer = require('multer');
const Application = require('../models/Application');
const auth = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDFs are allowed'));
    }
  },
});

// Submit an application (public)
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const { name, email, phone, coverLetter, jobId } = req.body;
    const resumeUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const application = new Application({
      name,
      email,
      phone,
      resumeUrl,
      coverLetter,
      jobId,
    });
    await application.save();
    res.status(201).json({ message: 'Application submitted' });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting application' });
  }
});

// Get all applications (admin-only)
router.get('/', auth, async (req, res) => {
  try {
    const applications = await Application.find().populate('jobId', 'title');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

module.exports = router;