const express = require('express');
const router = express.Router();

const userController = require('./user.controller');

const {authenticateToken, requireAdmin, requireAdminOrSupervisor} = require('../auth/auth.middleware.js');

router.get('/Allusers', authenticateToken , requireAdminOrSupervisor , userController.getAllUsers);

router.get('/', authenticateToken , requireAdminOrSupervisor , userController.getPaginatedUsers);

router.get('/:id', authenticateToken , requireAdminOrSupervisor , userController.getUserById);

router.post('/', authenticateToken , requireAdminOrSupervisor , userController.createUser);

router.put('/:id', authenticateToken , requireAdminOrSupervisor ,userController.updateUser);

router.delete('/:id', authenticateToken , requireAdmin , userController.deleteUser);

module.exports = router;