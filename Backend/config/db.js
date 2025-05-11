const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database Is Connected');
  } catch (error) {
    console.error('Database Connection Error:', error);
  }
};

module.exports = connectDB;
