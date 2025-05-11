const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  resumeUrl: { type: String, required: true },
  coverLetter: { type: String },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Application', applicationSchema);