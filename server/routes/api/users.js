const express = require('express');
const path = require('path');
const router = express.Router();
const usersController = require('../../controllers/usersController');


router.get('/', usersController.getAllUsers);
router.put('/', usersController.updateUser);
router.delete('/', usersController.deleteUser);
router.put('/updateToken', usersController.updateToken);

module.exports = router;

