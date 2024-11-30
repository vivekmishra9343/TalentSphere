const  express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authenticationRoutes = require('./routes/authenticationRoutes')
const appliedjob = require('./routes/appliedJob');


const app = express();
connectDB();
app.use(cors());
app.use(express.json());
require('dotenv').config();

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/authentication', authenticationRoutes);
app.use('/api/jobApplication',appliedjob)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

