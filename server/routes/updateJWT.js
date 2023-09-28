const express = require('express');
const path = require('path');
const router = express.Router();
const updateJWTController = require('../controllers/updateJWTController');

router.put('/', updateJWTController.updateToken)

module.exports = router