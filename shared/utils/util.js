const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function hashPassword(pass) {
    return await bcrypt.hash(pass, 10)
} 

async function comparePassword(plain, hashed) {
    return await bcrypt.compare(plain, hashed)
}

function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

function validateToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
}

function decodeToken(token) {
    return jwt.decode(token);
}

function checkAuth(req, res, next) {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required'
        });
    }
    next();
}

module.exports = { hashPassword, comparePassword, generateToken, validateToken, decodeToken, checkAuth}