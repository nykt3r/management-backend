// src/api/positions/position.routes.js

const express = require('express');
const router = express.Router();

const controller = require('./position.controller');
const {authenticateToken, requireAdmin, requireAdminOrSupervisor} = require('../auth/auth.middleware.js');
const { validatePosition } = require('./position.validator.js');


router.get('/', authenticateToken , requireAdminOrSupervisor , controller.getPaginatedPositions);

router.get('/all', authenticateToken , requireAdminOrSupervisor , controller.getAllPositions);

router.get('/:id', authenticateToken , requireAdminOrSupervisor , controller.getPositionById);

router.post('/', authenticateToken , validatePosition , requireAdmin , controller.createPosition);

router.put('/:id', authenticateToken , requireAdminOrSupervisor , controller.updatePosition);

router.delete('/:id', authenticateToken , requireAdmin , controller.deletePosition);

module.exports = router;
