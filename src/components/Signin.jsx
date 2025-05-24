import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../App';
import {  useNavigate } from 'react-router-dom';

function Signin() {
  const [isNewUser, setIsNewUser] = useState(true);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
   const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (isNewUser) {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          mobile: form.mobile,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Error registering');
        return;
      }

      alert('Registration successful!');
    } else {
      // For now, just log in directly if email exists (you can expand this with login endpoint later)
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Login failed');
        return;
      }

      alert('Login successful!');
    }

    setIsLoggedIn(true);
    navigate('/Home');
  } catch (err) {
    console.error('Error:', err);
    alert('Something went wrong. Try again.');
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isNewUser ? 'Register New User' : 'Login'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isNewUser && (
            <>
              <div>
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-gray-700">Gmail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          {isNewUser ? "Already have an account?" : "New user?"}{' '}
          <button
            type="button"
            onClick={() => setIsNewUser(!isNewUser)}
            className="text-blue-500 hover:underline"
          >
            {isNewUser ? 'Login here' : 'Register here'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signin;
