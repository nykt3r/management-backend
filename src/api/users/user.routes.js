const express = require('express');
const router = express.Router();

const userController = require('./user.controller');

router.get('/Allusers', userController.getAllUsers);

router.get('/paginated', userController.getPaginatedUsers);

router.get('/:id', userController.getUserById);


router.post('/', userController.createUser);


router.put('/:id', userController.updateUser);


router.delete('/:id', userController.deleteUser);

module.exports = router;
