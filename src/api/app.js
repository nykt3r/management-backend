const express = require('express');
const cors = require('cors');

const authRoutes = require('./auth/auth.routes');
const userRoutes = require('./users/user.routes');
const positionRoutes = require('./positions/positions.routes');
const dashboardRoutes = require('./dashboard/dashboard.routes');

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // Whitelisted frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    credentials: true, // Allow credentials
    optionsSuccessStatus: 200
}));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/positions', positionRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

module.exports = app;