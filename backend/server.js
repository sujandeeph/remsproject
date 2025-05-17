const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); 
const contactRoutes = require('./routes/contactRoutes'); 
const rentalRoutes = require("./routes/rentalRoutes");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect('mongodb+srv://sujandeep70:myStrongPassword123@cluster0.afjj5jx.mongodb.net/signupdb?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Use Routes
app.use('/api/users', userRoutes); 
app.use('/api/contact', contactRoutes);
app.use("/api/rental", rentalRoutes);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
