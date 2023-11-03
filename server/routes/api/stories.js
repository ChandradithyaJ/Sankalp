const express = require('express');
const router = express.Router();
const storiesController = require('../../controllers/storiesController');

router.get('/', storiesController.getAllStories);
router.get('/:id', storiesController.getStoryById);

module.exports = router
