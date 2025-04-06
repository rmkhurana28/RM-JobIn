const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

// Database connection
const db = require('./config/mongoose-connection');

// Middleware
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from frontend
app.use(express.static(path.join(__dirname, 'dist')));

// Routes
const userRoutes = require('./routes/user-routes');
const recRoutes = require('./routes/rec-routes');
const jobRoutes = require('./routes/job-routes');

app.use('/api/U', userRoutes);
app.use('/api/R', recRoutes);
app.use('/api/J', jobRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('working');
});

// React catch-all route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
