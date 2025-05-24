import React, { useState } from 'react';
import axios from 'axios'; // npm install axios

const InputPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    locality: '',
    propertyType: '',
    purpose: '',
    expectedPrice: '',
    possessionStatus: '',
    constructionStatus: '',
    carpetArea: '',
    totalFloors: '',
    floorNumber: '',
    furnishingStatus: '',
    ageOfProperty: '',
    facingDirection: '',
    amenities: [], // This will be an array on the frontend
    preferredVisitTime: '',
    preferredCommunicationMethod: '',
    isAgent: false,
    agentName: '',
    agentPhone: '',
    agentEmail: '',
    willingToNegotiate: 'Yes', // Default to Yes
    reasonForSelling: '',
    propertyDescription: '',
    virtualTourLink: '',
    videoTourLink: '',
    agreeToTerms: false,
    consentToShareDetails: false,
  });

  const [propertyPhotos, setPropertyPhotos] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const currentAmenities = prevData.amenities;
      if (checked) {
        return { ...prevData, amenities: [...currentAmenities, value] };
      } else {
        return {
          ...prevData,
          amenities: currentAmenities.filter((amenity) => amenity !== value),
        };
      }
    });
  };

  const handlePhotoChange = (e) => {
    setPropertyPhotos(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const data = new FormData();

      // Append all form data fields
      for (const key in formData) {
        if (key === 'amenities') {
          // Join amenities array into a comma-separated string for the backend
          data.append(key, formData[key].join(','));
        } else if (typeof formData[key] === 'boolean') {
          // Convert booleans to string 'true' or 'false' for multipart/form-data
          data.append(key, formData[key] ? 'true' : 'false');
        } else {
          data.append(key, formData[key]);
        }
      }

      // Append property photos
      propertyPhotos.forEach((photo) => {
        data.append('propertyPhotos', photo); // 'propertyPhotos' must match multer field name
      });

      const response = await axios.post('http://localhost:5000/api/properties', data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });

      setMessage(response.data.message);
      // Optionally reset form here:
      setFormData({
        name: '', email: '', phone: '', city: '', locality: '', propertyType: '', purpose: '',
        expectedPrice: '', possessionStatus: '', constructionStatus: '', carpetArea: '',
        totalFloors: '', floorNumber: '', furnishingStatus: '', ageOfProperty: '',
        facingDirection: '', amenities: [], preferredVisitTime: '',
        preferredCommunicationMethod: '', isAgent: false, agentName: '', agentPhone: '',
        agentEmail: '', willingToNegotiate: 'Yes', reasonForSelling: '',
        propertyDescription: '', virtualTourLink: '', videoTourLink: '',
        agreeToTerms: false, consentToShareDetails: false,
      });
      setPropertyPhotos([]);

    } catch (err) {
      console.error('Error submitting form:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Display backend error message
      } else {
        setError('Failed to save property. Please try again.');
      }
    }
  };

  const commonInputClasses = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
  const labelClasses = "block text-sm font-medium text-gray-700";
  const sectionTitleClasses = "text-lg font-semibold text-gray-900 mb-4";

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">List Your Property</h1>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{message}</span>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Details */}
          <section>
            <h2 className={sectionTitleClasses}>Contact Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="name" className={labelClasses}>Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={commonInputClasses} />
              </div>
              <div>
                <label htmlFor="email" className={labelClasses}>Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={commonInputClasses} />
              </div>
              <div>
                <label htmlFor="phone" className={labelClasses}>Phone</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className={commonInputClasses} />
              </div>
            </div>
          </section>

          <hr className="my-6 border-gray-200" />

          {/* Property Location */}
          <section>
            <h2 className={sectionTitleClasses}>Property Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className={labelClasses}>City</label>
                <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required className={commonInputClasses} />
              </div>
             <div>
  <label htmlFor="locality" className={labelClasses}>Locality</label>
  <select
    id="locality"
    name="locality"
    value={formData.locality}
    onChange={handleChange}
    required
    className={commonInputClasses}
  >
    <option value="">Select a locality</option>
    <option value="Vijayanagr">Vijayanagr</option>
    <option value="Gokulam">Gokulam</option>
    <option value="Jayalakshmipuram">Jayalakshmipuram</option>
    <option value="Saraswathipuram">Saraswathipuram</option>
    <option value="Hebbal">Hebbal</option>
  </select>
</div>

            </div>
          </section>

          <hr className="my-6 border-gray-200" />

          {/* Property Details */}
          <section>
            <h2 className={sectionTitleClasses}>Property Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label htmlFor="propertyType" className={labelClasses}>Property Type</label>
                <select id="propertyType" name="propertyType" value={formData.propertyType} onChange={handleChange} required className={commonInputClasses}>
                  <option value="">Select Type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Row House">Row House</option>
                  <option value="Shop">Shop</option>
                  <option value="Commercial Plot">Commercial Plot</option>
                </select>
              </div>
              <div>
                <label htmlFor="purpose" className={labelClasses}>Purpose</label>
                <select id="purpose" name="purpose" value={formData.purpose} onChange={handleChange} required className={commonInputClasses}>
                  <option value="">Select Purpose</option>
                  <option value="Sale">Sale</option>
                  <option value="Rent">Rent</option>
                </select>
              </div>
              <div>
                <label htmlFor="expectedPrice" className={labelClasses}>Expected Price (INR)</label>
                <input type="number" id="expectedPrice" name="expectedPrice" value={formData.expectedPrice} onChange={handleChange} required className={commonInputClasses} />
              </div>
              <div>
                <label htmlFor="possessionStatus" className={labelClasses}>Possession Status</label>
                <select id="possessionStatus" name="possessionStatus" value={formData.possessionStatus} onChange={handleChange} required className={commonInputClasses}>
                  <option value="">Select Status</option>
                  <option value="Ready to Move">Ready to Move</option>
                  <option value="Under Construction">Under Construction</option>
                </select>
              </div>
              <div>
                <label htmlFor="constructionStatus" className={labelClasses}>Construction Status</label>
                <select id="constructionStatus" name="constructionStatus" value={formData.constructionStatus} onChange={handleChange} required className={commonInputClasses}>
                  <option value="">Select Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Planned">Planned</option>
                </select>
              </div>
              <div>
                <label htmlFor="carpetArea" className={labelClasses}>Carpet Area (Sq. Ft.)</label>
                <input type="number" id="carpetArea" name="carpetArea" value={formData.carpetArea} onChange={handleChange} required className={commonInputClasses} />
              </div>
              <div>
                <label htmlFor="totalFloors" className={labelClasses}>Total Floors in Building</label>
                <input type="number" id="totalFloors" name="totalFloors" value={formData.totalFloors} onChange={handleChange} required className={commonInputClasses} />
              </div>
              <div>
                <label htmlFor="floorNumber" className={labelClasses}>Floor Number</label>
                <input type="number" id="floorNumber" name="floorNumber" value={formData.floorNumber} onChange={handleChange} required className={commonInputClasses} />
              </div>
              <div>
                <label htmlFor="furnishingStatus" className={labelClasses}>Furnishing Status</label>
                <select id="furnishingStatus" name="furnishingStatus" value={formData.furnishingStatus} onChange={handleChange} required className={commonInputClasses}>
                  <option value="">Select Status</option>
                  <option value="Furnished">Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>
              <div>
                <label htmlFor="ageOfProperty" className={labelClasses}>Age of Property</label>
                <select id="ageOfProperty" name="ageOfProperty" value={formData.ageOfProperty} onChange={handleChange} required className={commonInputClasses}>
                  <option value="">Select Age</option>
                  <option value="New (0-1 year)">New (0-1 year)</option>
                  <option value="1-5 Years">1-5 Years</option>
                  <option value="5-10 Years">5-10 Years</option>
                  <option value="10+ Years">10+ Years</option>
                </select>
              </div>
              <div>
                <label htmlFor="facingDirection" className={labelClasses}>Facing Direction</label>
                <select id="facingDirection" name="facingDirection" value={formData.facingDirection} onChange={handleChange} required className={commonInputClasses}>
                  <option value="">Select Direction</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                  <option value="North-East">North-East</option>
                  <option value="North-West">North-West</option>
                  <option value="South-East">South-East</option>
                  <option value="South-West">South-West</option>
                </select>
              </div>
            </div>
          </section>

          <hr className="my-6 border-gray-200" />

          {/* Amenities */}
          <section>
            <h2 className={sectionTitleClasses}>Amenities (Select all that apply)</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {['Parking', 'Gym', 'Swimming Pool', 'Security', 'Lift', 'Power Backup', 'Clubhouse', 'Children Play Area', 'Garden', 'Intercom'].map((amenity) => (
                <div key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    id={amenity}
                    name="amenities"
                    value={amenity}
                    checked={formData.amenities.includes(amenity)}
                    onChange={handleAmenitiesChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={amenity} className="ml-2 block text-sm text-gray-900">{amenity}</label>
                </div>
              ))}
            </div>
          </section>

          <hr className="my-6 border-gray-200" />

          {/* Visit & Communication */}
          <section>
            <h2 className={sectionTitleClasses}>Visit & Communication Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="preferredVisitTime" className={labelClasses}>Preferred Visit Time</label>
                <input type="text" id="preferredVisitTime" name="preferredVisitTime" value={formData.preferredVisitTime} onChange={handleChange} required className={commonInputClasses} placeholder="e.g., Weekdays 10 AM - 1 PM" />
              </div>
              <div>
                <label htmlFor="preferredCommunicationMethod" className={labelClasses}>Preferred Communication Method</label>
                <select id="preferredCommunicationMethod" name="preferredCommunicationMethod" value={formData.preferredCommunicationMethod} onChange={handleChange} required className={commonInputClasses}>
                  <option value="">Select Method</option>
                  <option value="Phone">Phone</option>
                  <option value="Email">Email</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
              </div>
            </div>
          </section>

          <hr className="my-6 border-gray-200" />

          {/* Agent Details */}
          <section>
            <h2 className={sectionTitleClasses}>Agent Information (if applicable)</h2>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="isAgent"
                name="isAgent"
                checked={formData.isAgent}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isAgent" className="ml-2 block text-sm text-gray-900">Are you an Agent?</label>
            </div>
            {formData.isAgent && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="agentName" className={labelClasses}>Agent Name</label>
                  <input type="text" id="agentName" name="agentName" value={formData.agentName} onChange={handleChange} className={commonInputClasses} />
                </div>
                <div>
                  <label htmlFor="agentPhone" className={labelClasses}>Agent Phone</label>
                  <input type="tel" id="agentPhone" name="agentPhone" value={formData.agentPhone} onChange={handleChange} className={commonInputClasses} />
                </div>
                <div>
                  <label htmlFor="agentEmail" className={labelClasses}>Agent Email</label>
                  <input type="email" id="agentEmail" name="agentEmail" value={formData.agentEmail} onChange={handleChange} className={commonInputClasses} />
                </div>
              </div>
            )}
          </section>

          <hr className="my-6 border-gray-200" />

          {/* Additional Details */}
          <section>
            <h2 className={sectionTitleClasses}>Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="willingToNegotiate" className={labelClasses}>Willing to Negotiate</label>
                <select id="willingToNegotiate" name="willingToNegotiate" value={formData.willingToNegotiate} onChange={handleChange} required className={commonInputClasses}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label htmlFor="reasonForSelling" className={labelClasses}>Reason for Selling (Optional)</label>
                <input type="text" id="reasonForSelling" name="reasonForSelling" value={formData.reasonForSelling} onChange={handleChange} className={commonInputClasses} />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="propertyDescription" className={labelClasses}>Property Description</label>
              <textarea id="propertyDescription" name="propertyDescription" value={formData.propertyDescription} onChange={handleChange} required rows="4" className={`${commonInputClasses} resize-y`}></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="virtualTourLink" className={labelClasses}>Virtual Tour Link (Optional)</label>
                <input type="url" id="virtualTourLink" name="virtualTourLink" value={formData.virtualTourLink} onChange={handleChange} className={commonInputClasses} placeholder="e.g., https://my.matterport.com/show/..." />
              </div>
              <div>
                <label htmlFor="videoTourLink" className={labelClasses}>Video Tour Link (Optional)</label>
                <input type="url" id="videoTourLink" name="videoTourLink" value={formData.videoTourLink} onChange={handleChange} className={commonInputClasses} placeholder="e.g., https://www.youtube.com/watch?v=..." />
              </div>
            </div>
          </section>

          <hr className="my-6 border-gray-200" />

          {/* Property Photos */}
          <section>
            <h2 className={sectionTitleClasses}>Property Photos</h2>
            <div className="mt-2">
              <label htmlFor="propertyPhotos" className="block text-sm font-medium text-gray-700 mb-2">Upload Photos (Max 10)</label>
              <input
                type="file"
                id="propertyPhotos"
                name="propertyPhotos"
                multiple
                accept="image/*"
                onChange={handlePhotoChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="mt-2 text-sm text-gray-500">
                {propertyPhotos.length > 0
                  ? `${propertyPhotos.length} file(s) selected.`
                  : 'No files chosen.'}
              </p>
            </div>
          </section>

          <hr className="my-6 border-gray-200" />

          {/* Terms & Conditions */}
          <section>
            <h2 className={sectionTitleClasses}>Terms & Conditions</h2>
            <div className="flex items-start mb-2">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required // This field is required by your schema
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-900">
                I agree to the terms and conditions.
              </label>
            </div>
            <div className="flex items-start">
              <input
                type="checkbox"
                id="consentToShareDetails"
                name="consentToShareDetails"
                checked={formData.consentToShareDetails}
                onChange={handleChange}
                required // This field is required by your schema
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="consentToShareDetails" className="ml-2 text-sm text-gray-900">
                I consent to share my details with potential buyers/tenants.
              </label>
            </div>
          </section>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              List Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputPage;