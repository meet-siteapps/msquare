const mongoose = require('mongoose');

const founderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: String,
  bio: String,
  photoUrl: String,
  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Founder', founderSchema);
