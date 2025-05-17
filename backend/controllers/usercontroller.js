const User = require('../models/user'); // adjust path if needed
const getProfileByEmail = async (req, res) => {
  const { email } = req.params;

  console.log('Requested email:', email);
  try {

console.log('Finding user with:', email);
const user = await User.findOne({ email }).select('-mobile');
console.log('Found user:', user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
module.exports = { getProfileByEmail };
