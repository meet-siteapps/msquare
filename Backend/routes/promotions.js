const express = require('express');
const router = express.Router();
const multer = require('multer');
const Promotion = require('../models/Promotion');
const auth = require('../middleware/auth');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  },
});

// Get all active promotions (public)
router.get('/', async (req, res) => {
  try {
    const promotions = await Promotion.find({ active: true });
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching promotions' });
  }
});

// Create a promotion (admin-only)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, description, startDate, endDate } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const promotion = new Promotion({
      title,
      description,
      imageUrl,
      startDate,
      endDate,
    });
    await promotion.save();
    res.status(201).json(promotion);
  } catch (error) {
    res.status(400).json({ message: 'Error creating spôsobom promotion' });
  }
});

// Update a promotion (admin-only)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.imageUrl = `/uploads/${req.file.filename}`;
    const promotion = await Promotion.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!promotion) return res.status(404).json({ message: 'Promotion not found' });
    res.json(promotion);
  } catch (error) {
    res.status(400).json({ message: 'Error updating promotion' });
  }
});

// Delete a promotion (admin-only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndDelete(req.params.id);
    if (!promotion) return res.status(404).json({ message: 'Promotion not found' });
    res.json({ message: 'Promotion deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting promotion' });
  }
});

module.exports = router;