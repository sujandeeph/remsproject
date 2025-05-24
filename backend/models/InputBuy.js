const mongoose = require('mongoose');

const inputBuySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  aadhaar: String,
  pan: String,
  visitIntent: String,
  visitDate: String,
  visitTime: String,
  visitMode: String,
  paymentMode: String,
  loanNeeded: Boolean,
  advanceBooking: String,
  budget: String,
  purpose: String,
  contactTime: String,
  communicationMethod: String,
  terms: Boolean,
  shareDetails: Boolean,
  propertyDetails: {
    img: String,
    area: String,
    pricePerSqft: String,
    totalPrice: String,
    location: String
  }
}, { timestamps: true });

const InputBuy = mongoose.model('InputBuy', inputBuySchema);

module.exports = InputBuy;
