const jwt = require('jsonwebtoken');
const user = require('../models/user'); // Replace with your model path
const appliedJobs = require('../models/appliedJobs');

// JWT Secret (ensure this matches what was used to sign the token)
const JWT_SECRET = process.env.JWT_SECRET;

const getCandidate = async (req, res) => {
  try {
    // 1. Extract token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Authentication token is missing' });
    }

    // 2. Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET);
    const email = decoded.email; // Assuming the token contains the `email` field

    if (!email) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    // 3. Query MongoDB with the extracted email
    const userProfile = await appliedJobs.find({ email });
    

    if (!userProfile || userProfile.length === 0) {
      return res.status(404).json({ message: 'No user for this email' });
    }

    // 4. Return the applications
    res.status(200).json({ message: 'Applications retrieved successfully', userProfile });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = { getCandidate };
