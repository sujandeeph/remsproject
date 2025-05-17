import React from 'react'
import Footer from './Footer'
function Aboutus() {
  return (
    <div>
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          About <span className="text-blue-500">FindMyAsset</span>
        </h2>

        <p className="text-center text-gray-600 text-lg max-w-3xl mx-auto mb-10">
          FindMyAsset is a next-generation real estate management platform built to simplify the process of buying, selling, and renting properties. Whether you’re a homeowner, tenant, investor, or agent — we’re here to make real estate accessible, transparent, and efficient.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Our Mission</h3>
            <p>
              Our mission is to redefine how people interact with real estate. We aim to connect users with verified listings, streamline documentation, and provide expert support at every step of their property journey.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Why Choose Us</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Trusted & verified listings</li>
              <li>User-friendly interface</li>
              <li>Expert support and advice</li>
              <li>Advanced property search tools</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Who We Serve</h3>
            <p>
              From first-time buyers to seasoned investors, FindMyAsset serves individuals and businesses looking to make confident property decisions. We also assist landlords and property managers in efficiently renting and managing properties.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h4 className="text-2xl font-semibold mb-2">Let’s Build Your Future, Together</h4>
          <p className="text-gray-600">
            With FindMyAsset, your property goals are just a few clicks away.
          </p>
        </div>
      </div>
    </div>
<Footer/>
    </div>
  );
}

export default Aboutus;
