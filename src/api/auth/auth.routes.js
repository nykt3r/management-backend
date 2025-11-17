const express = require('express');
const router = express.Router();

const authController = require('./auth.controller.js');
const { loginValidator } = require('./auth.validator.js');

router.post('/login', loginValidator, authController.login);
router.get('/validate', authController.validateToken);
router.post('/logout', authController.logout);
router.put('/reset-password', authController.resetPassword);
router.get('/search-by-phone/:phone', authController.searchByPhone);

module.exports = router; 
