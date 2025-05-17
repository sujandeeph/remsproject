import React from 'react'

function Footer() {
  return (
    <div>
      <footer className="bg-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* Contact Us */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p> +91 98765 43210</p>
          <p>+91 91234 56789</p>
          <p> FindMyAsset@gmail.com</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-300">Reviews</a></li>
            <li><a href="#" className="hover:text-gray-300">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-gray-300">Connect With Us</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" className="hover:text-gray-300"><img src="./icons/facebook.svg" className='w-6 h-6 invert' alt="f" /></a>
            
            <a href="#" className="hover:text-gray-300"><img src="./icons/instagram.svg" className='w-6 h-6 invert' alt="i" /></a>
        
          </div>
        </div>

        {/* Newsletter / Optional */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
          <p className="mb-2">Subscribe to our newsletter</p>
          <input
            type="email"
            placeholder="Enter email"
            className="w-full p-2 text-black rounded mb-2"
          />
          <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300">
            Subscribe
          </button>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} FindMyAsset. All rights reserved.
      </div>
    </footer>
    </div>
  )
}

export default Footer
