// for stories 
const express = require('express');
const path = require('path');
const router = express.Router();

const storiesController = require('../../controllers/storiesController');

router.get('/', storiesController.getAllStories);
router.get('/:id', storiesController.getStoryById);
