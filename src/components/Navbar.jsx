import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useContext } from 'react';
import {  useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    
    navigate('/signin');
  };
  return (
    <div>
      <nav className="bg-gray-900 h-20  text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left Side - Logo + Title */}
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-extrabold font-serif tracking-wide">
            Find My <span className="text-blue-400">Asset</span>
          </span>
          <img src='./icons/logo.jpg' alt="Logo" className="h-10 w-10 object-contian rounded-full " />
        </div>

        {/* Right Side - Navigation Links */}
        <div className="flex space-x-16">
          <Link to="/Home" className="hover:text-blue-400 font-medium transition">Home</Link>
          <Link to="/about" className="hover:text-blue-400 font-medium transition">About Us</Link>
         
          {isLoggedIn ? (
            <span className="font-medium text-white">Log Out</span>
          ) : (
            <button
              onClick={handleLogin}
              className="hover:bg-blue-500 bg-blue-600 px-4 py-2 rounded-md text-white font-semibold"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
    </div>
  )
}

export default Navbar
