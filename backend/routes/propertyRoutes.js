const express = require('express');
const multer = require('multer');
const path = require('path');
const Property = require('../models/property');

const router = express.Router();

// Setup multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// POST /api/properties - create a new property listing with photos
router.post('/', upload.array('propertyPhotos', 10), async (req, res) => {
  try {
    // Extract file names
    const photos = req.files.map(file => file.filename);

    // Data comes as strings - convert booleans accordingly
    const {
      name,
      email,
      phone,
      city,
      locality,
      propertyType,
      purpose,
      expectedPrice,
      possessionStatus,
      constructionStatus,
      carpetArea,
      totalFloors,
      floorNumber,
      furnishingStatus,
      ageOfProperty,
      facingDirection,
      amenities,
      preferredVisitTime,
      preferredCommunicationMethod,
      isAgent,
      agentName,
      agentPhone,
      agentEmail,
      willingToNegotiate,
      reasonForSelling,
      propertyDescription,
      virtualTourLink,
      videoTourLink,
      agreeToTerms,
      consentToShareDetails
    } = req.body;

    const newProperty = new Property({
      name,
      email,
      phone,
      city,
      locality,
      propertyType,
      purpose,
      expectedPrice: Number(expectedPrice),
      possessionStatus,
      constructionStatus,
      carpetArea: Number(carpetArea),
      totalFloors: Number(totalFloors),
      floorNumber: Number(floorNumber),
      furnishingStatus,
      ageOfProperty,
      facingDirection,
      amenities: amenities ? amenities.split(',') : [],
      preferredVisitTime,
      preferredCommunicationMethod,
      isAgent: isAgent === 'true' || isAgent === true,
      agentName,
      agentPhone,
      agentEmail,
      willingToNegotiate,
      reasonForSelling,
      propertyDescription,
      virtualTourLink,
      videoTourLink,
      agreeToTerms: agreeToTerms === 'true' || agreeToTerms === true,
      consentToShareDetails: consentToShareDetails === 'true' || consentToShareDetails === true,
      photos
    });

    await newProperty.save();

    res.status(201).json({ message: 'Property saved successfully', property: newProperty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
// 🔹 GET /api/properties - Custom fields for frontend
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find({});

    const formatted = properties.map(p => ({
      location:p.locality,
      totalPrice: p.expectedPrice,
      area: p.carpetArea,
      pricePerSqft: (p.expectedPrice / p.carpetArea).toFixed(2),
      image: p.photos?.[0] || null,
      propertytype:p.propertyType
    }));

    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch properties' });
  }
});

module.exports = router;
