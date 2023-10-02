const express = require('express');
const router = express.Router();
const picController = require('../../controllers/picController')

router.get('/', picController.getAllPics)
router.post('/single-pic', picController.getSinglePic)
router.post('/upload-pic', picController.updateProfilePic)

module.exports = router;

