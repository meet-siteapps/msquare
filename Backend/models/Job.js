const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salaryRange: {
    type: String,
  },
  applicationDeadline: {
    type: Date,
    required: true,
  },
  postedDate: { 
    type: Date, 
    default: Date.now 
  },
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open",
  },
});

module.exports = mongoose.model("Job", jobSchema);
