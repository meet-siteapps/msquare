const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Root route to send welcome text
app.get('/', (req, res) => {
  res.send('welcome to our solar world');
});

// Placeholder for routes
// e.g. app.use('/api/jobs', require('./dataBase/routes/jobs'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
