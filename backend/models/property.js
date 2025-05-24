const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  locality: { type: String, required: true },
  propertyType: { type: String,required:true },
  purpose: { type: String, required: true },
  expectedPrice: { type: Number, required: true },
  possessionStatus: { type: String, required: true },
  constructionStatus: { type: String, required: true },
  carpetArea: { type: Number, required: true },
  totalFloors: { type: Number, required: true },
  floorNumber: { type: Number, required: true },
  furnishingStatus: { type: String, required: true },
  ageOfProperty: { type: String, required: true },
  facingDirection: { type: String, required: true },
  amenities: { type: [String] },
  preferredVisitTime: { type: String, required: true },
  preferredCommunicationMethod: { type: String, required: true },
  isAgent: { type: Boolean, default: false },
  agentName: { type: String },
  agentPhone: { type: String },
  agentEmail: { type: String },
  willingToNegotiate: { type: String, required: true },
  reasonForSelling: { type: String },
  propertyDescription: { type: String, required: true },
  virtualTourLink: { type: String },
  videoTourLink: { type: String },
  agreeToTerms: { type: Boolean, required: true },
  consentToShareDetails: { type: Boolean, required: true },
  photos: { type: [String] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', propertySchema);
