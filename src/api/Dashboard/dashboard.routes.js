// src/modules/dashboard/dashboard.routes.js
const express = require('express');
const { getDashboardMetrics } = require('./dashboard.controller');

const router = express.Router();
const {authenticateToken,  requireAdminOrSupervisor} = require('../auth/auth.middleware.js');

router.get('/metrics', authenticateToken ,requireAdminOrSupervisor ,  getDashboardMetrics);

module.exports = router;