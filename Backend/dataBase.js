const mongoose = require('mongoose');
const express = require('express');
const app = express();

const db = async () => {
  try { 
  await mongoose.connect('mongodb+srv://msquare11:msquare11@m-square-solar.ycguvgx.mongodb.net/msquare', {
  useNewUrlParser: true,
  useUnifiedTopology: true,

}) ;
        console.log('Database Is Connected');
  } catch (error) {
            console.log(error,'Database Connection Error');
  }
};
db();


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
