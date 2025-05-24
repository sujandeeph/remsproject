import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const InputBuyPage = () => {
  const location = useLocation();
  const {
    img,
    area,
    pricePerSqft,
    totalPrice,
    location: place,
  } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    aadhaar: '',
    pan: '',
    visitIntent: 'Yes',
    visitDate: '',
    visitTime: '',
    visitMode: '',
    paymentMode: '',
    loanNeeded: false,
    advanceBooking: 'No',
    budget: '',
    purpose: '',
    contactTime: '',
    communicationMethod: '',
    terms: false,
    shareDetails: false,
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    ...formData,
    propertyDetails: {
      img,
      area,
      pricePerSqft,
      totalPrice,
      location: place
    }
  };

  try {
    const response = await fetch('http://localhost:5000/api/inputbuy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.ok) {
      alert('Form submitted successfully!');
    } else {
      alert(`Submission failed: ${result.message}`);
    }

  } catch (error) {
    console.error('Error submitting form:', error);
    alert('An error occurred while submitting the form.');
  }
};


  if (!img) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-red-500">No Property Selected</h1>
        <p>Please go back and choose a property to view details.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
     
      <img
        src={img}
        alt="Property"
        className="w-full h-[200px] object-cover rounded-md mb-4"
      />
      <div className="space-y-2 mb-6">
        <p><strong>Area:</strong> {area}</p>
        <p><strong>Price per Sqft:</strong> ₹{pricePerSqft}</p>
        <p><strong>Total Price:</strong> ₹{totalPrice}</p>
        <p><strong>Location:</strong> {place}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Buyer Information</h2>

        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="aadhaar" placeholder="Aadhaar Number" value={formData.aadhaar} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="pan" placeholder="PAN Number" value={formData.pan} onChange={handleChange} className="w-full p-2 border rounded" />

        <select name="visitIntent" value={formData.visitIntent} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="Yes">Want to Visit</option>
          <option value="No">Not Interested in Visit</option>
        </select>

        <input type="date" name="visitDate" value={formData.visitDate} onChange={handleChange} className="w-full p-2 border rounded" required />
        <select name="visitTime" value={formData.visitTime} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Select Time Slot</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>
        <select name="visitMode" value={formData.visitMode} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Mode of Visit</option>
          <option value="Virtual">Virtual Tour</option>
          <option value="In-person">In-person Visit</option>
        </select>

        <select name="paymentMode" value={formData.paymentMode} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Select Payment Mode</option>
          <option value="UPI">UPI</option>
          <option value="NEFT">NEFT</option>
          <option value="Cash">Cash</option>
          <option value="Loan">Loan</option>
        </select>

        <label className="flex items-center gap-2">
          <input type="checkbox" name="loanNeeded" checked={formData.loanNeeded} onChange={handleChange} />
          Need Loan Assistance?
        </label>

        <select name="advanceBooking" value={formData.advanceBooking} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="No">No Advance Payment</option>
          <option value="Yes">Willing for Advance Booking</option>
        </select>

        <input type="number" name="budget" placeholder="Confirmed Budget (₹)" value={formData.budget} onChange={handleChange} className="w-full p-2 border rounded" required />

        <select name="purpose" value={formData.purpose} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Purpose of Buying</option>
          <option value="Self">Self Use</option>
          <option value="Investment">Investment</option>
          <option value="Family">Family</option>
        </select>

        <select name="contactTime" value={formData.contactTime} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Preferred Contact Time</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>

        <select name="communicationMethod" value={formData.communicationMethod} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Preferred Communication</option>
          <option value="Phone">Phone</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="Email">Email</option>
        </select>

        <label className="flex items-center gap-2">
          <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} required />
          I agree to Terms & Conditions
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" name="shareDetails" checked={formData.shareDetails} onChange={handleChange} required />
          I agree to share my details with the seller
        </label>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default InputBuyPage;
