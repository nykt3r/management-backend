const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function hashPassword(pass) {
    return await bcrypt.hash(pass, 10)
} 

async function comparePassword(plain, hashed) {
    return await bcrypt.compare(plain, hashed)
}

function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
}

function validateToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
}

function decodeToken(token) {
    return jwt.decode(token);
}

module.exports = { hashPassword, comparePassword, generateToken, validateToken, decodeToken }