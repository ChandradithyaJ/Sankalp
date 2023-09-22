const express = require('express');
const path = require('path');
const router = express.Router();
const usersController = require('../../controllers/usersController');


router.get('/', usersController.getAllUsers);
router.post('/', usersController.createNewUser);
router.put('/', usersController.updateUser);
router.delete('/', usersController.deleteUser);
router.put('/updateToken', usersController.updateToken);

//TODO to check integration testing

module.exports = router;

