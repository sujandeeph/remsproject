const express = require('express');
const InputBuy = require('../models/InputBuy'); // No .js extension needed for CommonJS

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const data = new InputBuy(req.body);
    await data.save();
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Form submission error:', error.message);
    res.status(500).json({ message: 'Failed to submit form', error: error.message });
  }
});

module.exports = router;
