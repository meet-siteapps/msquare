const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const auth = require('../middleware/auth');

// Get all active jobs (public)
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'open' });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

// Create a job (admin-only)
router.post('/', auth, async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: 'Error creating job' });
  }
});

// Update a job (admin-only)
router.put('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: 'Error updating job' });
  }
});

// Delete a job (admin-only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job' });
  }
});

module.exports = router;