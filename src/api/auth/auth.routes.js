const express = require('express');
const router = express.Router();

const authController = require('./auth.controller.js');
const { loginValidation } = require('../../../shared/middlewares/auth.middleware.js');

router.post('/login', loginValidation, authController.login);

module.exports = router; // 👈 esto debe estar
