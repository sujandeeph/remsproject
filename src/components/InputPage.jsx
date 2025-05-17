import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Import useEffect for initial state logic

const InputPage = () => {
  const location = useLocation();
  // Destructure state from location.state. This is more relevant if navigating from a 'select property type' page
  // where 'propertyType' might already be set. For a direct visit, it defaults to empty.
  const initialStatePropertyType = location.state?.propertyType || '';

  // Initialize formData with a comprehensive set of fields for ALL property types,
  // setting default values for universally applicable fields.
  const [formData, setFormData] = useState({
    propertyType: initialStatePropertyType, // Crucial for conditional rendering

    // I. Basic Property Identification & Listing Details (Universal or broadly applicable)
    listingTitle: '',
    propertyStatus: 'For Sale',
    expectedPrice: '',
    propertyAge: '',
    availabilityStatus: 'Ready to Move',
    possessionDate: '', // Only if Under Construction

    // II. Location & Address Details (Universal)
    streetAddress: '',
    landmark: '',
    city: 'Mysuru',
    state: 'Karnataka',
    pincode: '',
    googleMapsLink: '',

    // III. Property Specifications (Type-specific, initialized for common denominators or null)
    // Row House & Apartment specific
    builtUpArea: '', // Row House, Apartment, Shop
    plotArea: '', // Row House, Commercial Plot
    numBedrooms: '', // Row House, Apartment
    numBathrooms: '', // Row House, Apartment
    numBalconies: '0', // Row House, Apartment
    floorDetails: '', // Row House specific (e.g., "Ground + 1")
    floorNumber: '', // Apartment, Shop specific (e.g., '5', 'Ground')
    totalFloorsInBuilding: '', // Apartment, Shop specific
    facing: '', // Universal
    furnishingStatus: 'Unfurnished', // Row House, Apartment, Shop
    furnitureIncluded: { // Row House, Apartment, Shop
      wardrobes: false, acs: false, geysers: false, modularKitchen: false, fansLights: false,
    },
    parkingType: [], // Universal
    numCarParks: '', // Universal
    numTwoWheelerParks: '', // Universal
    waterSupply: [], // Row House, Apartment
    electricityConnection: '', // Row House, Apartment, Shop
    superBuiltUpArea: '', // Apartment
    carpetArea: '', // Apartment, Shop
    apartmentType: '', // Apartment
    maintenanceCharges: '', // Apartment, Shop
    maintenanceFrequency: '', // Apartment, Shop
    associationFee: '', // Apartment
    reraRegistered: false, // Apartment, Commercial Plot (for layout approvals)
    reraId: '', // Apartment, Commercial Plot

    // Shop/Commercial Space specific
    propertyFor: 'Sale', // Shop (can be Sale or Rent)
    propertyTypeCommercial: '', // Shop type (e.g., 'Shop', 'Office Space')
    washroomsAvailable: '', // Shop
    frontageLength: '', // Shop (in feet)
    ceilingHeight: '', // Shop (in feet)
    powerLoad: '', // Shop (in KVA or kW)
    airConditioning: '', // Shop
    fireSafetyMeasures: [], // Shop
    accessType: [], // Shop
    suitableFor: [], // Shop (renamed from `เหมาะFor` for clarity)

    // Commercial Plot specific
    plotAreaUnit: '', // Commercial Plot ('Sq. Ft.', 'Acres', 'Guntas')
    plotDimensions: '', // Commercial Plot
    roadFacingWidth: '', // Commercial Plot
    numOpenSides: '', // Commercial Plot
    boundaryWall: false, // Commercial Plot
    gatedPlotCommunity: false, // Commercial Plot
    approvedBy: [], // Commercial Plot (e.g., 'BDA', 'MUDA')
    zoneType: '', // Commercial Plot
    permissibleFAR: '', // Commercial Plot
    waterConnectionAvailable: false, // Commercial Plot
    electricityConnectionAvailablePlot: false, // Commercial Plot (distinguish from property electricity)
    sewerageConnectionAvailable: false, // Commercial Plot

    // IV. Amenities & Features (Type-specific)
    hasPrivateGarden: false, // Row House
    hasPrivateTerrace: false, // Row House
    gatedCommunity: false, // Row House, Apartment
    communityName: '', // Row House, Apartment
    securityFeatures: [], // Row House, Apartment
    communityAmenities: [], // Row House, Apartment
    hasPowerBackup: false, // Universal
    hasLift: false, // Apartment, Shop (optional for row houses)
    hasRainwaterHarvesting: false, // Universal
    hasSolarWaterHeater: false, // Row House, Apartment
    hasIntercom: false, // Row House, Apartment
    hasServantRoom: false, // Row House, Apartment
    hasStudyRoom: false, // Row House, Apartment
    hasPoojaRoom: false, // Row House, Apartment
    hasVisitorParking: false, // Universal
    hasWasteDisposal: false, // Universal

    // V. Legal & Financial Information (Universal)
    ownershipType: '',
    encumbranceStatus: 'Clear Title',
    bankLoanDetails: '',
    documentsAvailable: [],

    // VI. Seller Contact & Preferences (Universal)
    sellerFullName: '',
    sellerPhone: '',
    sellerEmail: '',
    preferredContactTime: '',
    preferredCommunicationMethod: '',
    isAgent: false,
    agentName: '',
    agentPhone: '',
    agentEmail: '',
    willingToNegotiate: 'Yes',
    reasonForSelling: '',

    // VII. Marketing & Media (Universal)
    propertyPhotos: [],
    virtualTourLink: '',
    videoTourLink: '',
    propertyDescription: '',

    // VIII. Terms & Declarations (Universal)
    agreeToTerms: false,
    consentToShareDetails: false,
  });

  // Effect to clear/reset type-specific fields when propertyType changes
  useEffect(() => {
    // This is a basic reset. For a more sophisticated form, you might
    // selectively clear fields or use a more complex state management.
    const resetTypeSpecificFields = (currentType) => {
      const newFormData = { ...formData };
      const commonFields = [
        'listingTitle', 'propertyStatus', 'expectedPrice', 'propertyAge', 'availabilityStatus', 'possessionDate',
        'streetAddress', 'landmark', 'city', 'state', 'pincode', 'googleMapsLink',
        'parkingType', 'numCarParks', 'numTwoWheelerParks', 'hasPowerBackup', 'hasVisitorParking', 'hasWasteDisposal',
        'ownershipType', 'encumbranceStatus', 'bankLoanDetails', 'documentsAvailable',
        'sellerFullName', 'sellerPhone', 'sellerEmail', 'preferredContactTime', 'preferredCommunicationMethod',
        'isAgent', 'agentName', 'agentPhone', 'agentEmail', 'willingToNegotiate', 'reasonForSelling',
        'propertyPhotos', 'virtualTourLink', 'videoTourLink', 'propertyDescription',
        'agreeToTerms', 'consentToShareDetails'
      ];

      // Reset all non-common fields
      for (const key in formData) {
        if (!commonFields.includes(key) && key !== 'propertyType' && key !== 'furnitureIncluded') {
          if (Array.isArray(formData[key])) {
            newFormData[key] = [];
          } else if (typeof formData[key] === 'boolean') {
            newFormData[key] = false;
          } else if (typeof formData[key] === 'object' && formData[key] !== null) {
            // Handle nested objects if any apart from furnitureIncluded
          } else {
            newFormData[key] = '';
          }
        }
      }
      // Reset furnitureIncluded specifically
      newFormData.furnitureIncluded = {
        wardrobes: false, acs: false, geysers: false, modularKitchen: false, fansLights: false,
      };

      setFormData(newFormData);
    };

    if (formData.propertyType && formData.propertyType !== initialStatePropertyType) {
      resetTypeSpecificFields(formData.propertyType);
    }
  }, [formData.propertyType]); // Only re-run when propertyType changes

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    if (type === 'checkbox') {
      // For general checkboxes like hasPrivateGarden, hasPowerBackup, agreeToTerms, isAgent
      if (name.startsWith('has') || name === 'agreeToTerms' || name === 'consentToShareDetails' || name === 'isAgent' || name === 'reraRegistered' || name === 'boundaryWall' || name === 'gatedPlotCommunity' || name === 'waterConnectionAvailable' || name === 'electricityConnectionAvailablePlot' || name === 'sewerageConnectionAvailable') {
        setFormData((prev) => ({
          ...prev,
          [name]: checked,
        }));
      } else if (name.startsWith('furnitureIncluded.')) { // Nested object for furniture
        const furnitureKey = name.split('.')[1];
        setFormData((prev) => ({
          ...prev,
          furnitureIncluded: {
            ...prev.furnitureIncluded,
            [furnitureKey]: checked,
          },
        }));
      } else if (['parkingType', 'waterSupply', 'securityFeatures', 'communityAmenities', 'documentsAvailable', 'fireSafetyMeasures', 'accessType', 'suitableFor', 'approvedBy'].includes(name)) {
        // For array checkboxes (multiple selections)
        setFormData((prev) => ({
          ...prev,
          [name]: checked
            ? [...prev[name], value]
            : prev[name].filter((item) => item !== value),
        }));
      } else { // Fallback for any other checkbox type if missed
        setFormData((prev) => ({
          ...prev,
          [name]: checked,
        }));
      }
    } else if (type === 'file') {
      // For file inputs (e.g., property photos, layout)
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'propertyPhotos' ? [...prev.propertyPhotos, ...Array.from(e.target.files)] : e.target.files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Seller Form Data Submitted:', formData);
    // Here you would typically send formData to your backend API
    alert('Property listing submitted successfully!');
    // Optional: Reset form or redirect
    // setFormData(initialState); // Consider a reset function
  };

  // --- Render Functions for each property type ---
  const renderRowHouseFields = () => (
    <>
      {/* III. Row House Specific Specifications */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Row House Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="builtUpArea" className="block text-sm font-medium text-gray-700 mb-1">Built-up Area (Sq. Ft.) <span className="text-red-500">*</span></label>
            <input type="number" name="builtUpArea" id="builtUpArea" placeholder="e.g., 1200" value={formData.builtUpArea} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
          </div>
          <div>
            <label htmlFor="plotArea" className="block text-sm font-medium text-gray-700 mb-1">Plot Area (Sq. Ft.) <span className="text-red-500">*</span></label>
            <input type="number" name="plotArea" id="plotArea" placeholder="e.g., 1500" value={formData.plotArea} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label htmlFor="numBedrooms" className="block text-sm font-medium text-gray-700 mb-1">Number of Bedrooms (BHK) <span className="text-red-500">*</span></label>
            <select name="numBedrooms" id="numBedrooms" value={formData.numBedrooms} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
              <option value="">Select</option>
              {[...Array(6).keys()].map(i => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
              <option value="5+">5+</option>
            </select>
          </div>
          <div>
            <label htmlFor="numBathrooms" className="block text-sm font-medium text-gray-700 mb-1">Number of Bathrooms <span className="text-red-500">*</span></label>
            <select name="numBathrooms" id="numBathrooms" value={formData.numBathrooms} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
              <option value="">Select</option>
              {[...Array(5).keys()].map(i => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
              <option value="4+">4+</option>
            </select>
          </div>
          <div>
            <label htmlFor="numBalconies" className="block text-sm font-medium text-gray-700 mb-1">Number of Balconies <span className="text-red-500">*</span></label>
            <select name="numBalconies" id="numBalconies" value={formData.numBalconies} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
              <option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="3+">3+</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="floorDetails" className="block text-sm font-medium text-gray-700 mb-1">Floor Details (e.g., G+1, G+2) <span className="text-red-500">*</span></label>
          <input type="text" name="floorDetails" id="floorDetails" placeholder="e.g., Ground + 1, Two Storey" value={formData.floorDetails} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
        </div>
        <div className="mt-4">
          <label htmlFor="facing" className="block text-sm font-medium text-gray-700 mb-1">Property Facing <span className="text-red-500">*</span></label>
          <select name="facing" id="facing" value={formData.facing} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
            <option value="">Select Facing</option><option value="North">North</option><option value="South">South</option><option value="East">East</option><option value="West">West</option><option value="North-East">North-East</option><option value="North-West">North-West</option><option value="South-East">South-East</option><option value="South-West">South-West</option>
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="furnishingStatus" className="block text-sm font-medium text-gray-700 mb-1">Furnishing Status <span className="text-red-500">*</span></label>
          <select name="furnishingStatus" id="furnishingStatus" value={formData.furnishingStatus} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
            <option value="Unfurnished">Unfurnished</option><option value="Semi-Furnished">Semi-Furnished</option><option value="Fully Furnished">Fully Furnished</option>
          </select>
        </div>
        {(formData.furnishingStatus === 'Semi-Furnished' || formData.furnishingStatus === 'Fully Furnished') && (
          <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-white">
            <h4 className="text-md font-semibold text-gray-800 mb-2">Furniture/Fixtures Included:</h4>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center"><input type="checkbox" name="furnitureIncluded.wardrobes" checked={formData.furnitureIncluded.wardrobes} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Wardrobes</span></label>
              <label className="flex items-center"><input type="checkbox" name="furnitureIncluded.acs" checked={formData.furnitureIncluded.acs} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">ACs</span></label>
              <label className="flex items-center"><input type="checkbox" name="furnitureIncluded.geysers" checked={formData.furnitureIncluded.geysers} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Geysers</span></label>
              <label className="flex items-center"><input type="checkbox" name="furnitureIncluded.modularKitchen" checked={formData.furnitureIncluded.modularKitchen} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Modular Kitchen</span></label>
              <label className="flex items-center"><input type="checkbox" name="furnitureIncluded.fansLights" checked={formData.furnitureIncluded.fansLights} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Fans & Lights</span></label>
            </div>
          </div>
        )}

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Water Supply <span className="text-red-500">*</span></label>
          <div className="flex gap-4">
            <label className="flex items-center"><input type="checkbox" name="waterSupply" value="Borewell" checked={formData.waterSupply.includes('Borewell')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Borewell</span></label>
            <label className="flex items-center"><input type="checkbox" name="waterSupply" value="Municipal Water" checked={formData.waterSupply.includes('Municipal Water')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Municipal Water</span></label>
            <label className="flex items-center"><input type="checkbox" name="waterSupply" value="Both" checked={formData.waterSupply.includes('Both')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Both</span></label>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="electricityConnection" className="block text-sm font-medium text-gray-700 mb-1">Electricity Connection <span className="text-red-500">*</span></label>
          <select name="electricityConnection" id="electricityConnection" value={formData.electricityConnection} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
            <option value="">Select Type</option><option value="Single Phase">Single Phase</option><option value="Three Phase">Three Phase</option>
          </select>
        </div>
      </div>

      {/* IV. Row House Specific Amenities & Features */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Row House Amenities & Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center gap-2"><input type="checkbox" name="hasPrivateGarden" checked={formData.hasPrivateGarden} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="text-sm text-gray-900">Private Garden / Lawn</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" name="hasPrivateTerrace" checked={formData.hasPrivateTerrace} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="text-sm text-gray-900">Private Terrace / Rooftop Access</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" name="gatedCommunity" checked={formData.gatedCommunity} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="text-sm text-gray-900">Part of a Gated Community</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" name="hasPowerBackup" checked={formData.hasPowerBackup} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="text-sm text-gray-900">Power Backup</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" name="hasLift" checked={formData.hasLift} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="text-sm text-gray-900">Has Lift (if applicable)</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" name="hasRainwaterHarvesting" checked={formData.hasRainwaterHarvesting} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="text-sm text-gray-900">Rainwater Harvesting</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" name="hasSolarWaterHeater" checked={formData.hasSolarWaterHeater} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="text-sm text-gray-900">Solar Water Heater</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" name="hasIntercom" checked={formData.hasIntercom} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="ml-2 text-sm text-gray-900">Intercom Facility</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" name="hasServantRoom" checked={formData.hasServantRoom} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="ml-2 text-sm text-gray-900">Servant Room</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" name="hasStudyRoom" checked={formData.hasStudyRoom} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="ml-2 text-sm text-gray-900">Study Room</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" name="hasPoojaRoom" checked={formData.hasPoojaRoom} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="ml-2 text-sm text-gray-900">Pooja Room</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" name="hasVisitorParking" checked={formData.hasVisitorParking} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="ml-2 text-sm text-gray-900">Visitor Parking</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" name="hasWasteDisposal" checked={formData.hasWasteDisposal} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="ml-2 text-sm text-gray-900">Waste Disposal</span></label>
        </div>

        {formData.gatedCommunity && (
          <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-white">
            <h4 className="text-md font-semibold text-gray-800 mb-3">Gated Community Details:</h4>
            <div>
              <label htmlFor="communityName" className="block text-sm font-medium text-gray-700 mb-1">Community Name <span className="text-red-500">*</span></label>
              <input type="text" name="communityName" id="communityName" placeholder="e.g., Prestige Shantiniketan" value={formData.communityName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required={formData.gatedCommunity} />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Security Features: <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center"><input type="checkbox" name="securityFeatures" value="24/7 Security" checked={formData.securityFeatures.includes('24/7 Security')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">24/7 Security</span></label>
                <label className="flex items-center"><input type="checkbox" name="securityFeatures" value="CCTV Surveillance" checked={formData.securityFeatures.includes('CCTV Surveillance')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">CCTV Surveillance</span></label>
                <label className="flex items-center"><input type="checkbox" name="securityFeatures" value="Gated Entry" checked={formData.securityFeatures.includes('Gated Entry')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Gated Entry</span></label>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Community Amenities: <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center"><input type="checkbox" name="communityAmenities" value="Clubhouse" checked={formData.communityAmenities.includes('Clubhouse')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Clubhouse</span></label>
                <label className="flex items-center"><input type="checkbox" name="communityAmenities" value="Swimming Pool" checked={formData.communityAmenities.includes('Swimming Pool')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Swimming Pool</span></label>
                <label className="flex items-center"><input type="checkbox" name="communityAmenities" value="Gym" checked={formData.communityAmenities.includes('Gym')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Gym / Fitness Center</span></label>
                <label className="flex items-center"><input type="checkbox" name="communityAmenities" value="Children's Play Area" checked={formData.communityAmenities.includes("Children's Play Area")} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Children's Play Area</span></label>
                <label className="flex items-center"><input type="checkbox" name="communityAmenities" value="Sports Facilities" checked={formData.communityAmenities.includes('Sports Facilities')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Sports Facilities (Tennis, Badminton etc.)</span></label>
                <label className="flex items-center"><input type="checkbox" name="communityAmenities" value="Jogging Track" checked={formData.communityAmenities.includes('Jogging Track')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Jogging Track</span></label>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );

  const renderApartmentFields = () => (
    <>
      {/* III. Apartment Specific Specifications */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Apartment Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="builtUpArea" className="block text-sm font-medium text-gray-700 mb-1">Built-up Area (Sq. Ft.) <span className="text-red-500">*</span></label>
            <input type="number" name="builtUpArea" id="builtUpArea" placeholder="e.g., 1200" value={formData.builtUpArea} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
          </div>
          <div>
            <label htmlFor="superBuiltUpArea" className="block text-sm font-medium text-gray-700 mb-1">Super Built-up Area (Sq. Ft.) <span className="text-red-500">*</span></label>
            <input type="number" name="superBuiltUpArea" id="superBuiltUpArea" placeholder="e.g., 1500" value={formData.superBuiltUpArea} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="carpetArea" className="block text-sm font-medium text-gray-700 mb-1">Carpet Area (Sq. Ft.)</label>
          <input type="number" name="carpetArea" id="carpetArea" placeholder="e.g., 900" value={formData.carpetArea} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label htmlFor="apartmentType" className="block text-sm font-medium text-gray-700 mb-1">Apartment Type (BHK) <span className="text-red-500">*</span></label>
            <select name="apartmentType" id="apartmentType" value={formData.apartmentType} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
              <option value="">Select</option>
              <option value="Studio">Studio</option>
              <option value="1BHK">1 BHK</option>
              <option value="2BHK">2 BHK</option>
              <option value="3BHK">3 BHK</option>
              <option value="4BHK">4 BHK</option>
              <option value="5BHK">5 BHK</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Duplex">Duplex</option>
              <option value="4+">4+ BHK</option>
            </select>
          </div>
          <div>
            <label htmlFor="numBathrooms" className="block text-sm font-medium text-gray-700 mb-1">Number of Bathrooms <span className="text-red-500">*</span></label>
            <select name="numBathrooms" id="numBathrooms" value={formData.numBathrooms} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
              <option value="">Select</option>
              {[...Array(5).keys()].map(i => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
              <option value="4+">4+</option>
            </select>
          </div>
          <div>
            <label htmlFor="numBalconies" className="block text-sm font-medium text-gray-700 mb-1">Number of Balconies <span className="text-red-500">*</span></label>
            <select name="numBalconies" id="numBalconies" value={formData.numBalconies} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
              <option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="3+">3+</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="floorNumber" className="block text-sm font-medium text-gray-700 mb-1">Floor Number <span className="text-red-500">*</span></label>
            <input type="text" name="floorNumber" id="floorNumber" placeholder="e.g., 5, Ground" value={formData.floorNumber} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
          </div>
          <div>
            <label htmlFor="totalFloorsInBuilding" className="block text-sm font-medium text-gray-700 mb-1">Total Floors in Building <span className="text-red-500">*</span></label>
            <input type="number" name="totalFloorsInBuilding" id="totalFloorsInBuilding" placeholder="e.g., 10" value={formData.totalFloorsInBuilding} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="facing" className="block text-sm font-medium text-gray-700 mb-1">Apartment Facing <span className="text-red-500">*</span></label>
          <select name="facing" id="facing" value={formData.facing} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
            <option value="">Select Facing</option><option value="North">North</option><option value="South">South</option><option value="East">East</option><option value="West">West</option><option value="North-East">North-East</option><option value="North-West">North-West</option><option value="South-East">South-East</option><option value="South-West">South-West</option>
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="furnishingStatus" className="block text-sm font-medium text-gray-700 mb-1">Furnishing Status <span className="text-red-500">*</span></label>
          <select name="furnishingStatus" id="furnishingStatus" value={formData.furnishingStatus} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
            <option value="Unfurnished">Unfurnished</option><option value="Semi-Furnished">Semi-Furnished</option><option value="Fully Furnished">Fully Furnished</option>
          </select>
        </div>
        {(formData.furnishingStatus === 'Semi-Furnished' || formData.furnishingStatus === 'Fully Furnished') && (
          <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-white">
            <h4 className="text-md font-semibold text-gray-800 mb-2">Furniture/Fixtures Included:</h4>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center"><input type="checkbox" name="furnitureIncluded.wardrobes" checked={formData.furnitureIncluded.wardrobes} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Wardrobes</span></label>
              <label className="flex items-center"><input type="checkbox" name="furnitureIncluded.acs" checked={formData.furnitureIncluded.acs} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">ACs</span></label>
              <label className="flex items-center"><input type="checkbox" name="furnitureIncluded.geysers" checked={formData.furnitureIncluded.geysers} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Geysers</span></label>
              <label className="flex items-center"><input type="checkbox" name="furnitureIncluded.modularKitchen" checked={formData.furnitureIncluded.modularKitchen} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Modular Kitchen</span></label>
              <label className="flex items-center"><input type="checkbox" name="furnitureIncluded.fansLights" checked={formData.furnitureIncluded.fansLights} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Fans & Lights</span></label>
            </div>
          </div>
        )}

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Water Supply <span className="text-red-500">*</span></label>
          <div className="flex gap-4">
            <label className="flex items-center"><input type="checkbox" name="waterSupply" value="Borewell" checked={formData.waterSupply.includes('Borewell')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Borewell</span></label>
            <label className="flex items-center"><input type="checkbox" name="waterSupply" value="Municipal Water" checked={formData.waterSupply.includes('Municipal Water')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Municipal Water</span></label>
            <label className="flex items-center"><input type="checkbox" name="waterSupply" value="Both" checked={formData.waterSupply.includes('Both')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Both</span></label>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="electricityConnection" className="block text-sm font-medium text-gray-700 mb-1">Electricity Connection <span className="text-red-500">*</span></label>
          <select name="electricityConnection" id="electricityConnection" value={formData.electricityConnection} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
            <option value="">Select Type</option><option value="Single Phase">Single Phase</option><option value="Three Phase">Three Phase</option>
          </select>
        </div>
      </div>

      {/* IV. Apartment Specific Amenities & Features */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Apartment Amenities & Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Private Garden/Terrace less common for apartments, make conditional or remove if not relevant */}
          {/* <label className="flex items-center gap-2"><input type="checkbox" name="hasPrivateGarden" checked={formData.hasPrivateGarden} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="text-sm text-gray-900">Private Garden (Ground Floor)</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" name="hasPrivateTerrace" checked={formData.hasPrivateTerrace} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="text-sm text-gray-900">Private Terrace (Penthouse)</span></label> */}

          <label className="flex items-center gap-2"><input type="checkbox" name="gatedCommunity" checked={formData.gatedCommunity} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="text-sm text-gray-900">Part of a Gated Community</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" name="hasPowerBackup" checked={formData.hasPowerBackup} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="text-sm text-gray-900">Power Backup</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" name="hasLift" checked={formData.hasLift} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="text-sm text-gray-900">Has Lift</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" name="hasRainwaterHarvesting" checked={formData.hasRainwaterHarvesting} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="text-sm text-gray-900">Rainwater Harvesting</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" name="hasSolarWaterHeater" checked={formData.hasSolarWaterHeater} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="text-sm text-gray-900">Solar Water Heater</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" name="hasIntercom" checked={formData.hasIntercom} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="ml-2 text-sm text-gray-900">Intercom Facility</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" name="hasServantRoom" checked={formData.hasServantRoom} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="ml-2 text-sm text-gray-900">Servant Room</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" name="hasStudyRoom" checked={formData.hasStudyRoom} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="ml-2 text-sm text-gray-900">Study Room</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" name="hasPoojaRoom" checked={formData.hasPoojaRoom} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="ml-2 text-sm text-gray-900">Pooja Room</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" name="hasVisitorParking" checked={formData.hasVisitorParking} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="ml-2 text-sm text-gray-900">Visitor Parking</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" name="hasWasteDisposal" checked={formData.hasWasteDisposal} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="ml-2 text-sm text-gray-900">Waste Disposal</span></label>
        </div>

        {formData.gatedCommunity && (
          <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-white">
            <h4 className="text-md font-semibold text-gray-800 mb-3">Community Details:</h4>
            <div>
              <label htmlFor="communityName" className="block text-sm font-medium text-gray-700 mb-1">Community Name <span className="text-red-500">*</span></label>
              <input type="text" name="communityName" id="communityName" placeholder="e.g., Brigade Gateway" value={formData.communityName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required={formData.gatedCommunity} />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Security Features: <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center"><input type="checkbox" name="securityFeatures" value="24/7 Security" checked={formData.securityFeatures.includes('24/7 Security')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">24/7 Security</span></label>
                <label className="flex items-center"><input type="checkbox" name="securityFeatures" value="CCTV Surveillance" checked={formData.securityFeatures.includes('CCTV Surveillance')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">CCTV Surveillance</span></label>
                <label className="flex items-center"><input type="checkbox" name="securityFeatures" value="Gated Entry" checked={formData.securityFeatures.includes('Gated Entry')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Gated Entry</span></label>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Community Amenities: <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center"><input type="checkbox" name="communityAmenities" value="Clubhouse" checked={formData.communityAmenities.includes('Clubhouse')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Clubhouse</span></label>
                <label className="flex items-center"><input type="checkbox" name="communityAmenities" value="Swimming Pool" checked={formData.communityAmenities.includes('Swimming Pool')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Swimming Pool</span></label>
                <label className="flex items-center"><input type="checkbox" name="communityAmenities" value="Gym" checked={formData.communityAmenities.includes('Gym')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Gym / Fitness Center</span></label>
                <label className="flex items-center"><input type="checkbox" name="communityAmenities" value="Children's Play Area" checked={formData.communityAmenities.includes("Children's Play Area")} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Children's Play Area</span></label>
                <label className="flex items-center"><input type="checkbox" name="communityAmenities" value="Sports Facilities" checked={formData.communityAmenities.includes('Sports Facilities')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Sports Facilities (Tennis, Badminton etc.)</span></label>
                <label className="flex items-center"><input type="checkbox" name="communityAmenities" value="Jogging Track" checked={formData.communityAmenities.includes('Jogging Track')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Jogging Track</span></label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Apartment specific Legal & Financial */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Apartment Financials & Regulatory</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="maintenanceCharges" className="block text-sm font-medium text-gray-700 mb-1">Maintenance Charges (₹)</label>
            <input type="number" name="maintenanceCharges" id="maintenanceCharges" placeholder="e.g., 3000" value={formData.maintenanceCharges} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
          </div>
          <div>
            <label htmlFor="maintenanceFrequency" className="block text-sm font-medium text-gray-700 mb-1">Maintenance Frequency</label>
            <select name="maintenanceFrequency" id="maintenanceFrequency" value={formData.maintenanceFrequency} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm">
              <option value="">Select</option><option value="Monthly">Monthly</option><option value="Quarterly">Quarterly</option><option value="Annually">Annually</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="associationFee" className="block text-sm font-medium text-gray-700 mb-1">Association Fee (One-time, ₹)</label>
          <input type="number" name="associationFee" id="associationFee" placeholder="e.g., 50000" value={formData.associationFee} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
        </div>
        <div className="mt-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="reraRegistered" checked={formData.reraRegistered} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <span className="text-sm text-gray-900">RERA Registered?</span>
          </label>
          {formData.reraRegistered && (
            <div className="mt-2">
              <label htmlFor="reraId" className="block text-sm font-medium text-gray-700 mb-1">RERA ID <span className="text-red-500">*</span></label>
              <input type="text" name="reraId" id="reraId" placeholder="e.g., PRM/KA/RERA/1251/310/PR/171014/000000" value={formData.reraId} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required={formData.reraRegistered} />
            </div>
          )}
        </div>
      </div>
    </>
  );

  const renderShopFields = () => (
    <>
      {/* III. Shop/Commercial Space Specific Specifications */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Commercial Space Specifications</h2>
        <div>
          <label htmlFor="propertyTypeCommercial" className="block text-sm font-medium text-gray-700 mb-1">Commercial Property Type <span className="text-red-500">*</span></label>
          <select name="propertyTypeCommercial" id="propertyTypeCommercial" value={formData.propertyTypeCommercial} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
            <option value="">Select Type</option>
            <option value="Shop">Shop</option>
            <option value="Office Space">Office Space</option>
            <option value="Showroom">Showroom</option>
            <option value="Warehouse">Warehouse</option>
            <option value="Godown">Godown</option>
            <option value="Restaurant/Cafe">Restaurant/Cafe</option>
            <option value="Factory">Factory</option>
            <option value="Retail Space">Retail Space</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="builtUpArea" className="block text-sm font-medium text-gray-700 mb-1">Built-up Area (Sq. Ft.) <span className="text-red-500">*</span></label>
            <input type="number" name="builtUpArea" id="builtUpArea" placeholder="e.g., 500" value={formData.builtUpArea} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
          </div>
          <div>
            <label htmlFor="carpetArea" className="block text-sm font-medium text-gray-700 mb-1">Carpet Area (Sq. Ft.) <span className="text-red-500">*</span></label>
            <input type="number" name="carpetArea" id="carpetArea" placeholder="e.g., 400" value={formData.carpetArea} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="floorNumber" className="block text-sm font-medium text-gray-700 mb-1">Floor Number <span className="text-red-500">*</span></label>
            <input type="text" name="floorNumber" id="floorNumber" placeholder="e.g., Ground, 1st, Basement" value={formData.floorNumber} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
          </div>
          <div>
            <label htmlFor="totalFloorsInBuilding" className="block text-sm font-medium text-gray-700 mb-1">Total Floors in Building <span className="text-red-500">*</span></label>
            <input type="number" name="totalFloorsInBuilding" id="totalFloorsInBuilding" placeholder="e.g., 5" value={formData.totalFloorsInBuilding} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="washroomsAvailable" className="block text-sm font-medium text-gray-700 mb-1">Washrooms Available <span className="text-red-500">*</span></label>
          <select name="washroomsAvailable" id="washroomsAvailable" value={formData.washroomsAvailable} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
            <option value="">Select</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="Shared">Shared</option><option value="None">None</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="frontageLength" className="block text-sm font-medium text-gray-700 mb-1">Frontage Length (Ft.) (Optional)</label>
            <input type="number" name="frontageLength" id="frontageLength" placeholder="e.g., 20" value={formData.frontageLength} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
          </div>
          <div>
            <label htmlFor="ceilingHeight" className="block text-sm font-medium text-gray-700 mb-1">Ceiling Height (Ft.) (Optional)</label>
            <input type="number" name="ceilingHeight" id="ceilingHeight" placeholder="e.g., 10" value={formData.ceilingHeight} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="facing" className="block text-sm font-medium text-gray-700 mb-1">Property Facing <span className="text-red-500">*</span></label>
          <select name="facing" id="facing" value={formData.facing} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
            <option value="">Select Facing</option><option value="North">North</option><option value="South">South</option><option value="East">East</option><option value="West">West</option><option value="North-East">North-East</option><option value="North-West">North-West</option><option value="South-East">South-East</option><option value="South-West">South-West</option>
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="furnishingStatus" className="block text-sm font-medium text-gray-700 mb-1">Furnishing Status <span className="text-red-500">*</span></label>
          <select name="furnishingStatus" id="furnishingStatus" value={formData.furnishingStatus} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
            <option value="Unfurnished">Unfurnished</option><option value="Semi-Furnished">Semi-Furnished</option><option value="Fully Furnished">Fully Furnished</option>
          </select>
        </div>
        {(formData.furnishingStatus === 'Semi-Furnished' || formData.furnishingStatus === 'Fully Furnished') && (
          <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-white">
            <h4 className="text-md font-semibold text-gray-800 mb-2">Fixtures Included:</h4>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center"><input type="checkbox" name="furnitureIncluded.acs" checked={formData.furnitureIncluded.acs} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">ACs</span></label>
              <label className="flex items-center"><input type="checkbox" name="furnitureIncluded.fansLights" checked={formData.furnitureIncluded.fansLights} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Fans & Lights</span></label>
            </div>
          </div>
        )}
        <div className="mt-4">
          <label htmlFor="electricityConnection" className="block text-sm font-medium text-gray-700 mb-1">Electricity Connection <span className="text-red-500">*</span></label>
          <select name="electricityConnection" id="electricityConnection" value={formData.electricityConnection} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
            <option value="">Select Type</option><option value="Single Phase">Single Phase</option><option value="Three Phase">Three Phase</option>
          </select>
        </div>
      </div>

      {/* IV. Shop/Commercial Space Specific Amenities & Features */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Commercial Space Features</h2>
        <div className="mt-4">
          <label htmlFor="powerLoad" className="block text-sm font-medium text-gray-700 mb-1">Power Load (in KVA/kW) (Optional)</label>
          <input type="text" name="powerLoad" id="powerLoad" placeholder="e.g., 10 KVA" value={formData.powerLoad} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
        </div>
        <div className="mt-4">
          <label htmlFor="airConditioning" className="block text-sm font-medium text-gray-700 mb-1">Air Conditioning</label>
          <select name="airConditioning" id="airConditioning" value={formData.airConditioning} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm">
            <option value="">Select</option><option value="Central AC">Central AC</option><option value="Split AC">Split AC</option><option value="Window AC">Window AC</option><option value="None">None</option>
          </select>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Fire Safety Measures:</label>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center"><input type="checkbox" name="fireSafetyMeasures" value="Fire Extinguishers" checked={formData.fireSafetyMeasures.includes('Fire Extinguishers')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Fire Extinguishers</span></label>
            <label className="flex items-center"><input type="checkbox" name="fireSafetyMeasures" value="Sprinklers" checked={formData.fireSafetyMeasures.includes('Sprinklers')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Sprinklers</span></label>
            <label className="flex items-center"><input type="checkbox" name="fireSafetyMeasures" value="Fire Alarm" checked={formData.fireSafetyMeasures.includes('Fire Alarm')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Fire Alarm</span></label>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Access Type:</label>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center"><input type="checkbox" name="accessType" value="Road Facing" checked={formData.accessType.includes('Road Facing')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Road Facing</span></label>
            <label className="flex items-center"><input type="checkbox" name="accessType" value="Mall Internal" checked={formData.accessType.includes('Mall Internal')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Mall Internal</span></label>
            <label className="flex items-center"><input type="checkbox" name="accessType" value="Complex Internal" checked={formData.accessType.includes('Complex Internal')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Commercial Complex Internal</span></label>
            <label className="flex items-center"><input type="checkbox" name="accessType" value="Independent" checked={formData.accessType.includes('Independent')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Independent Unit</span></label>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Suitable For:</label>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center"><input type="checkbox" name="suitableFor" value="Retail Store" checked={formData.suitableFor.includes('Retail Store')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Retail Store</span></label>
            <label className="flex items-center"><input type="checkbox" name="suitableFor" value="Office" checked={formData.suitableFor.includes('Office')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Office</span></label>
            <label className="flex items-center"><input type="checkbox" name="suitableFor" value="Clinic/Pharmacy" checked={formData.suitableFor.includes('Clinic/Pharmacy')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Clinic/Pharmacy</span></label>
            <label className="flex items-center"><input type="checkbox" name="suitableFor" value="Restaurant/Cafe" checked={formData.suitableFor.includes('Restaurant/Cafe')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Restaurant/Cafe</span></label>
            <label className="flex items-center"><input type="checkbox" name="suitableFor" value="Warehouse/Storage" checked={formData.suitableFor.includes('Warehouse/Storage')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Warehouse/Storage</span></label>
            <label className="flex items-center"><input type="checkbox" name="suitableFor" value="Salon/Spa" checked={formData.suitableFor.includes('Salon/Spa')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Salon/Spa</span></label>
          </div>
        </div>
        <div className="mt-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="hasPowerBackup" checked={formData.hasPowerBackup} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <span className="text-sm text-gray-900">Power Backup</span>
          </label>
        </div>
        <div className="mt-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="hasLift" checked={formData.hasLift} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <span className="text-sm text-gray-900">Has Lift</span>
          </label>
        </div>
      </div>

      {/* Shop/Commercial specific Legal & Financial */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Commercial Financials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="maintenanceCharges" className="block text-sm font-medium text-gray-700 mb-1">Maintenance Charges (₹)</label>
            <input type="number" name="maintenanceCharges" id="maintenanceCharges" placeholder="e.g., 2000" value={formData.maintenanceCharges} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
          </div>
          <div>
            <label htmlFor="maintenanceFrequency" className="block text-sm font-medium text-gray-700 mb-1">Maintenance Frequency</label>
            <select name="maintenanceFrequency" id="maintenanceFrequency" value={formData.maintenanceFrequency} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm">
              <option value="">Select</option><option value="Monthly">Monthly</option><option value="Quarterly">Quarterly</option><option value="Annually">Annually</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="propertyFor" value="Sale" checked={formData.propertyFor === 'Sale'} onChange={handleChange} className="form-radio h-4 w-4 text-blue-600" />
            <span className="ml-2">For Sale</span>
          </label>
          <label className="flex items-center ml-4">
            <input type="radio" name="propertyFor" value="Rent" checked={formData.propertyFor === 'Rent'} onChange={handleChange} className="form-radio h-4 w-4 text-blue-600" />
            <span className="ml-2">For Rent</span>
          </label>
        </div>
        <div className="mt-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="gstApplicable" checked={formData.gstApplicable} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <span className="text-sm text-gray-900">GST Applicable on Rent/Sale?</span>
          </label>
        </div>
      </div>
    </>
  );

  const renderCommercialPlotFields = () => (
    <>
      {/* III. Commercial Plot Specific Specifications */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Commercial Plot Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="plotArea" className="block text-sm font-medium text-gray-700 mb-1">Plot Area <span className="text-red-500">*</span></label>
            <input type="number" name="plotArea" id="plotArea" placeholder="e.g., 2400" value={formData.plotArea} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
          </div>
          <div>
            <label htmlFor="plotAreaUnit" className="block text-sm font-medium text-gray-700 mb-1">Unit <span className="text-red-500">*</span></label>
            <select name="plotAreaUnit" id="plotAreaUnit" value={formData.plotAreaUnit} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
              <option value="">Select Unit</option>
              <option value="Sq. Ft.">Sq. Ft.</option>
              <option value="Sq. Yards">Sq. Yards</option>
              <option value="Acres">Acres</option>
              <option value="Guntas">Guntas</option>
              <option value="Cents">Cents</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="plotDimensions" className="block text-sm font-medium text-gray-700 mb-1">Plot Dimensions (Optional)</label>
          <input type="text" name="plotDimensions" id="plotDimensions" placeholder="e.g., 40x60, Irregular" value={formData.plotDimensions} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
        </div>
        <div className="mt-4">
          <label htmlFor="roadFacingWidth" className="block text-sm font-medium text-gray-700 mb-1">Road Facing Width (Ft.) (Optional)</label>
          <input type="number" name="roadFacingWidth" id="roadFacingWidth" placeholder="e.g., 30" value={formData.roadFacingWidth} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
        </div>
        <div className="mt-4">
          <label htmlFor="numOpenSides" className="block text-sm font-medium text-gray-700 mb-1">Number of Open Sides <span className="text-red-500">*</span></label>
          <select name="numOpenSides" id="numOpenSides" value={formData.numOpenSides} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
            <option value="">Select</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="facing" className="block text-sm font-medium text-gray-700 mb-1">Plot Facing <span className="text-red-500">*</span></label>
          <select name="facing" id="facing" value={formData.facing} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
            <option value="">Select Facing</option><option value="North">North</option><option value="South">South</option><option value="East">East</option><option value="West">West</option><option value="North-East">North-East</option><option value="North-West">North-West</option><option value="South-East">South-East</option><option value="South-West">South-West</option>
          </select>
        </div>
        <div className="mt-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="boundaryWall" checked={formData.boundaryWall} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <span className="text-sm text-gray-900">Boundary Wall Available?</span>
          </label>
        </div>
        <div className="mt-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="gatedPlotCommunity" checked={formData.gatedPlotCommunity} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <span className="text-sm text-gray-900">Part of a Gated Plot Community?</span>
          </label>
        </div>
      </div>

      {/* IV. Commercial Plot Approvals & Features */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Plot Approvals & Utilities</h2>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Approved By (Select all that apply): <span className="text-red-500">*</span></label>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center"><input type="checkbox" name="approvedBy" value="BDA" checked={formData.approvedBy.includes('BDA')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">BDA (Bangalore Development Authority)</span></label>
            <label className="flex items-center"><input type="checkbox" name="approvedBy" value="MUDA" checked={formData.approvedBy.includes('MUDA')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">MUDA (Mysuru Urban Development Authority)</span></label>
            <label className="flex items-center"><input type="checkbox" name="approvedBy" value="DTCP" checked={formData.approvedBy.includes('DTCP')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">DTCP (Directorate of Town & Country Planning)</span></label>
            <label className="flex items-center"><input type="checkbox" name="approvedBy" value="RERA" checked={formData.approvedBy.includes('RERA')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">RERA</span></label>
            <label className="flex items-center"><input type="checkbox" name="approvedBy" value="DC Converted" checked={formData.approvedBy.includes('DC Converted')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">DC Converted</span></label>
            <label className="flex items-center"><input type="checkbox" name="approvedBy" value="Panchayat Approved" checked={formData.approvedBy.includes('Panchayat Approved')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Panchayat Approved</span></label>
            <label className="flex items-center"><input type="checkbox" name="approvedBy" value="Other" checked={formData.approvedBy.includes('Other')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Other</span></label>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="zoneType" className="block text-sm font-medium text-gray-700 mb-1">Zone Type <span className="text-red-500">*</span></label>
          <select name="zoneType" id="zoneType" value={formData.zoneType} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
            <option value="">Select Zone</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
            <option value="Residential">Residential (for plots where commercial construction is permissible)</option>
            <option value="Mixed Use">Mixed Use</option>
            <option value="Agricultural">Agricultural (if applicable for commercial use)</option>
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="permissibleFAR" className="block text-sm font-medium text-gray-700 mb-1">Permissible FAR (Floor Area Ratio) (Optional)</label>
          <input type="text" name="permissibleFAR" id="permissibleFAR" placeholder="e.g., 2.5" value={formData.permissibleFAR} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Utility Connections Available:</label>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center"><input type="checkbox" name="waterConnectionAvailable" checked={formData.waterConnectionAvailable} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Water Connection</span></label>
            <label className="flex items-center"><input type="checkbox" name="electricityConnectionAvailablePlot" checked={formData.electricityConnectionAvailablePlot} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Electricity Connection</span></label>
            <label className="flex items-center"><input type="checkbox" name="sewerageConnectionAvailable" checked={formData.sewerageConnectionAvailable} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm text-gray-700">Sewerage Connection</span></label>
          </div>
        </div>
      </div>
    </>
  );


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-hidden p-6 md:p-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center border-b-2 border-blue-500 pb-4">
          List Your Property for Sale
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Property Type Selection - This is now the first section */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-200">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Select Property Type <span className="text-red-500">*</span></h2>
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <label className="inline-flex items-center p-3 border border-blue-300 rounded-lg shadow-sm bg-white cursor-pointer hover:bg-blue-100 transition-colors">
                <input
                  type="radio"
                  name="propertyType"
                  value="Row House"
                  checked={formData.propertyType === 'Row House'}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-blue-600"
                  required
                />
                <span className="ml-2 text-lg font-medium text-gray-800">Row House</span>
              </label>
              <label className="inline-flex items-center p-3 border border-blue-300 rounded-lg shadow-sm bg-white cursor-pointer hover:bg-blue-100 transition-colors">
                <input
                  type="radio"
                  name="propertyType"
                  value="Apartment"
                  checked={formData.propertyType === 'Apartment'}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-blue-600"
                  required
                />
                <span className="ml-2 text-lg font-medium text-gray-800">Apartment</span>
              </label>
              <label className="inline-flex items-center p-3 border border-blue-300 rounded-lg shadow-sm bg-white cursor-pointer hover:bg-blue-100 transition-colors">
                <input
                  type="radio"
                  name="propertyType"
                  value="Shop"
                  checked={formData.propertyType === 'Shop'}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-blue-600"
                  required
                />
                <span className="ml-2 text-lg font-medium text-gray-800">Shop / Office</span>
              </label>
              <label className="inline-flex items-center p-3 border border-blue-300 rounded-lg shadow-sm bg-white cursor-pointer hover:bg-blue-100 transition-colors">
                <input
                  type="radio"
                  name="propertyType"
                  value="Commercial Plot"
                  checked={formData.propertyType === 'Commercial Plot'}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-blue-600"
                  required
                />
                <span className="ml-2 text-lg font-medium text-gray-800">Commercial Plot</span>
              </label>
            </div>
          </div>

          {formData.propertyType && ( // Only show subsequent sections if a property type is selected
            <>
              {/* I. Basic Property Identification & Listing Details (Universal) */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Listing & Basic Details</h2>
                <div>
                  <label htmlFor="listingTitle" className="block text-sm font-medium text-gray-700 mb-1">Listing Title <span className="text-red-500">*</span></label>
                  <input type="text" name="listingTitle" id="listingTitle" placeholder="e.g., Spacious 3BHK Row House with Garden" value={formData.listingTitle} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                </div>
                <div>
                  <label htmlFor="propertyStatus" className="block text-sm font-medium text-gray-700 mb-1">Property Status <span className="text-red-500">*</span></label>
                  <select name="propertyStatus" id="propertyStatus" value={formData.propertyStatus} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
                    <option value="For Sale">For Sale</option><option value="Under Offer">Under Offer</option><option value="Sold">Sold</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="expectedPrice" className="block text-sm font-medium text-gray-700 mb-1">Expected Price (₹) <span className="text-red-500">*</span></label>
                  <input type="number" name="expectedPrice" id="expectedPrice" placeholder="e.g., 15000000" value={formData.expectedPrice} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                </div>
                {formData.propertyType !== 'Commercial Plot' && ( // Property age not as relevant for plots
                  <div>
                    <label htmlFor="propertyAge" className="block text-sm font-medium text-gray-700 mb-1">Property Age <span className="text-red-500">*</span></label>
                    <select name="propertyAge" id="propertyAge" value={formData.propertyAge} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required={formData.propertyType !== 'Commercial Plot'}>
                      <option value="">Select Age</option><option value="New Construction">New Construction</option><option value="0-5 years">0-5 years</option><option value="5-10 years">5-10 years</option><option value="10-20 years">10-20 years</option><option value="20+ years">20+ years</option><option value="Resale">Resale</option>
                    </select>
                  </div>
                )}
                {formData.propertyType !== 'Commercial Plot' && ( // Availability status not as relevant for plots
                  <div>
                    <label htmlFor="availabilityStatus" className="block text-sm font-medium text-gray-700 mb-1">Availability Status <span className="text-red-500">*</span></label>
                    <select name="availabilityStatus" id="availabilityStatus" value={formData.availabilityStatus} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required={formData.propertyType !== 'Commercial Plot'}>
                      <option value="Ready to Move">Ready to Move</option><option value="Under Construction">Under Construction</option>
                    </select>
                  </div>
                )}
                {formData.availabilityStatus === 'Under Construction' && formData.propertyType !== 'Commercial Plot' && (
                  <div>
                    <label htmlFor="possessionDate" className="block text-sm font-medium text-gray-700 mb-1">Expected Possession Date <span className="text-red-500">*</span></label>
                    <input type="date" name="possessionDate" id="possessionDate" value={formData.possessionDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                  </div>
                )}
              </div>

              {/* II. Location & Address Details (Universal) */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Location Details</h2>
                <div>
                  <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-1">Street Address / Locality <span className="text-red-500">*</span></label>
                  <input type="text" name="streetAddress" id="streetAddress" placeholder="House No., Street Name, Area" value={formData.streetAddress} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                </div>
                <div>
                  <label htmlFor="landmark" className="block text-sm font-medium text-gray-700 mb-1">Landmark (Optional)</label>
                  <input type="text" name="landmark" id="landmark" placeholder="e.g., Near Apollo Hospital" value={formData.landmark} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City <span className="text-red-500">*</span></label>
                    <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State <span className="text-red-500">*</span></label>
                    <input type="text" name="state" id="state" value={formData.state} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                  </div>
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">Pincode <span className="text-red-500">*</span></label>
                    <input type="text" name="pincode" id="pincode" placeholder="e.g., 570001" value={formData.pincode} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="googleMapsLink" className="block text-sm font-medium text-gray-700 mb-1">Google Maps Link (Optional)</label>
                  <input type="url" name="googleMapsLink" id="googleMapsLink" placeholder="Paste Google Maps URL here" value={formData.googleMapsLink} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
              </div>

              {/* Conditional Rendering for Property Type Specific Sections */}
              {formData.propertyType === 'Row House' && renderRowHouseFields()}
              {formData.propertyType === 'Apartment' && renderApartmentFields()}
              {formData.propertyType === 'Shop' && renderShopFields()}
              {formData.propertyType === 'Commercial Plot' && renderCommercialPlotFields()}

              {/* III. Parking Options (Universal or broadly applicable) */}
              {formData.propertyType !== 'Commercial Plot' && ( // Parking is less relevant for empty plots unless a designated plot is for parking
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Parking Details</h2>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Parking Options:</label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center">
                        <input type="checkbox" name="parkingType" value="Covered Parking" checked={formData.parkingType.includes('Covered Parking')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                        <span className="ml-2 text-sm text-gray-700">Covered Parking</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" name="parkingType" value="Open Parking" checked={formData.parkingType.includes('Open Parking')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                        <span className="ml-2 text-sm text-gray-700">Open Parking</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" name="parkingType" value="No Parking" checked={formData.parkingType.includes('No Parking')} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                        <span className="ml-2 text-sm text-gray-700">No Parking</span>
                      </label>
                    </div>
                  </div>
                  {formData.parkingType.length > 0 && !formData.parkingType.includes('No Parking') && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label htmlFor="numCarParks" className="block text-sm font-medium text-gray-700 mb-1">Number of Car Parks</label>
                        <input type="number" name="numCarParks" id="numCarParks" placeholder="e.g., 1" value={formData.numCarParks} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                      </div>
                      <div>
                        <label htmlFor="numTwoWheelerParks" className="block text-sm font-medium text-gray-700 mb-1">Number of Two-Wheeler Parks</label>
                        <input type="number" name="numTwoWheelerParks" id="numTwoWheelerParks" placeholder="e.g., 2" value={formData.numTwoWheelerParks} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                      </div>
                    </div>
                  )}
                </div>
              )}


              {/* V. Legal & Financial Information (Universal) */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Legal & Financial Information</h2>
                <div>
                  <label htmlFor="ownershipType" className="block text-sm font-medium text-gray-700 mb-1">Ownership Type <span className="text-red-500">*</span></label>
                  <select name="ownershipType" id="ownershipType" value={formData.ownershipType} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
                    <option value="">Select Type</option><option value="Freehold">Freehold</option><option value="Leasehold">Leasehold</option><option value="Power of Attorney">Power of Attorney (POA)</option>
                  </select>
                </div>
                <div className="mt-4">
                  <label htmlFor="encumbranceStatus" className="block text-sm font-medium text-gray-700 mb-1">Encumbrance Status <span className="text-red-500">*</span></label>
                  <select name="encumbranceStatus" id="encumbranceStatus" value={formData.encumbranceStatus} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
                    <option value="Clear Title">Clear Title</option><option value="Loan on Property">Loan on Property</option>
                  </select>
                </div>
                {formData.encumbranceStatus === 'Loan on Property' && (
                  <div className="mt-4">
                    <label htmlFor="bankLoanDetails" className="block text-sm font-medium text-gray-700 mb-1">Bank Name & Approximate Loan Amount</label>
                    <input type="text" name="bankLoanDetails" id="bankLoanDetails" placeholder="e.g., HDFC Bank, ₹50 Lakhs" value={formData.bankLoanDetails} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                  </div>
                )}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Available Documents:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Title Deed', 'Sale Deed', 'Encumbrance Certificate', 'Occupancy Certificate (OC)', 'Completion Certificate (CC)', 'Approved Building Plan', 'Property Tax Receipts', 'Electricity Bill', 'Water Bill', 'NOC from Society', 'Khata Certificate', 'Trade License', 'Fire Safety Certificate', 'RTC (Record of Rights, Tenancy, and Crops)', 'Survey Sketch'].map(doc => (
                      <label key={doc} className="flex items-center">
                        <input type="checkbox" name="documentsAvailable" value={doc} checked={formData.documentsAvailable.includes(doc)} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                        <span className="ml-2 text-sm text-gray-700">{doc}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* VI. Seller Contact & Preferences (Universal) */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Contact & Preferences</h2>
                <div>
                  <label htmlFor="sellerFullName" className="block text-sm font-medium text-gray-700 mb-1">Your Full Name <span className="text-red-500">*</span></label>
                  <input type="text" name="sellerFullName" id="sellerFullName" placeholder="As per ID proof" value={formData.sellerFullName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor="sellerPhone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                    <input type="tel" name="sellerPhone" id="sellerPhone" placeholder="e.g., +91 9876543210" value={formData.sellerPhone} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                  </div>
                  <div>
                    <label htmlFor="sellerEmail" className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" name="sellerEmail" id="sellerEmail" placeholder="your.email@example.com" value={formData.sellerEmail} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor="preferredContactTime" className="block text-sm font-medium text-gray-700 mb-1">Preferred Contact Time <span className="text-red-500">*</span></label>
                    <select name="preferredContactTime" id="preferredContactTime" value={formData.preferredContactTime} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
                      <option value="">Select Time</option><option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option><option value="Afternoon (1 PM - 5 PM)">Afternoon (1 PM - 5 PM)</option><option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option><option value="Anytime">Anytime</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="preferredCommunicationMethod" className="block text-sm font-medium text-gray-700 mb-1">Preferred Communication Method <span className="text-red-500">*</span></label>
                    <select name="preferredCommunicationMethod" id="preferredCommunicationMethod" value={formData.preferredCommunicationMethod} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
                      <option value="">Select Method</option><option value="Phone Call">Phone Call</option><option value="WhatsApp">WhatsApp</option><option value="Email">Email</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="isAgent" checked={formData.isAgent} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="text-sm text-gray-900">Are you a Real Estate Agent/Broker?</span>
                  </label>
                </div>
                {formData.isAgent && (
                  <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-white">
                    <h4 className="text-md font-semibold text-gray-800 mb-3">Agent/Broker Details:</h4>
                    <div>
                      <label htmlFor="agentName" className="block text-sm font-medium text-gray-700 mb-1">Agent/Broker Name <span className="text-red-500">*</span></label>
                      <input type="text" name="agentName" id="agentName" placeholder="Agent's Name" value={formData.agentName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required={formData.isAgent} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label htmlFor="agentPhone" className="block text-sm font-medium text-gray-700 mb-1">Agent Phone Number <span className="text-red-500">*</span></label>
                        <input type="tel" name="agentPhone" id="agentPhone" placeholder="Agent's Phone" value={formData.agentPhone} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required={formData.isAgent} />
                      </div>
                      <div>
                        <label htmlFor="agentEmail" className="block text-sm font-medium text-gray-700 mb-1">Agent Email <span className="text-red-500">*</span></label>
                        <input type="email" name="agentEmail" id="agentEmail" placeholder="Agent's Email" value={formData.agentEmail} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required={formData.isAgent} />
                      </div>
                    </div>
                  </div>
                )}
                <div className="mt-4">
                  <label htmlFor="willingToNegotiate" className="block text-sm font-medium text-gray-700 mb-1">Willing to Negotiate Price? <span className="text-red-500">*</span></label>
                  <select name="willingToNegotiate" id="willingToNegotiate" value={formData.willingToNegotiate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required>
                    <option value="Yes">Yes</option><option value="No">No</option>
                  </select>
                </div>
                <div className="mt-4">
                  <label htmlFor="reasonForSelling" className="block text-sm font-medium text-gray-700 mb-1">Reason for Selling (Optional)</label>
                  <textarea name="reasonForSelling" id="reasonForSelling" rows="3" placeholder="e.g., Relocating to another city, Upgrading to a larger home, Investment opportunity." value={formData.reasonForSelling} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"></textarea>
                </div>
              </div>

              {/* VII. Marketing & Media (Universal) */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Photos & Media</h2>
                <div>
                  <label htmlFor="propertyPhotos" className="block text-sm font-medium text-gray-700 mb-1">Property Photos <span className="text-red-500">*</span></label>
                  <input type="file" name="propertyPhotos" id="propertyPhotos" multiple accept="image/*" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" required />
                  {formData.propertyPhotos.length > 0 && (
                    <div className="mt-2 text-sm text-gray-600">
                      Selected: {formData.propertyPhotos.map(file => file.name).join(', ')}
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <label htmlFor="virtualTourLink" className="block text-sm font-medium text-gray-700 mb-1">360° Virtual Tour Link (Optional)</label>
                  <input type="url" name="virtualTourLink" id="virtualTourLink" placeholder="Paste virtual tour URL here" value={formData.virtualTourLink} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div className="mt-4">
                  <label htmlFor="videoTourLink" className="block text-sm font-medium text-gray-700 mb-1">Video Tour Link (YouTube/Vimeo) (Optional)</label>
                  <input type="url" name="videoTourLink" id="videoTourLink" placeholder="Paste video URL here" value={formData.videoTourLink} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                </div>
                <div className="mt-4">
                  <label htmlFor="propertyDescription" className="block text-sm font-medium text-gray-700 mb-1">Property Description <span className="text-red-500">*</span></label>
                  <textarea name="propertyDescription" id="propertyDescription" rows="6" placeholder="Describe your property in detail, highlighting unique features, neighborhood benefits, and amenities. Min 200 words." value={formData.propertyDescription} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm" required></textarea>
                </div>
              </div>

              {/* VIII. Terms & Declarations (Universal) */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Declarations</h2>
                <div className="space-y-3">
                  <label htmlFor="agreeToTerms" className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" name="agreeToTerms" id="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} className="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" required />
                    <span className="text-sm text-gray-900">
                      I agree to the <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Terms & Conditions</a> of this website. <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <label htmlFor="consentToShareDetails" className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" name="consentToShareDetails" id="consentToShareDetails" checked={formData.consentToShareDetails} onChange={handleChange} className="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" required />
                    <span className="text-sm text-gray-900">
                      I consent to sharing my contact details and property information with potential buyers and real estate agents through this platform. <span className="text-red-500">*</span>
                    </span>
                  </label>
                </div>
              </div>

              {/* Global Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-xl"
              >
                List My Property
              </button>
            </>
          )} {/* End of conditional rendering for main form sections */}
        </form>
      </div>
    </div>
  );
};

export default InputPage;