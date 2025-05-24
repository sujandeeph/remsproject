require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes'); 
const inputBuyRoutes = require('./routes/inputBuyRoutes.js');// add property routes

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Static folder for property photos
app.use('/uploads', express.static('uploads'));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes); 
app.use('/api/inputbuy',inputBuyRoutes);
 // add this lineinput

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
