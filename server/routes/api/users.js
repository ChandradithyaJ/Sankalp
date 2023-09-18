const express = require('express')
const path = require('path')
const router = express.Router()

const usersController = require('../../controllers/usersController')

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser);

module.exports = router