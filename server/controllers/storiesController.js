const db = require('../model/stories.json');

const getAllStories = (req, res) => {
    res.status(200).json(db);
}

const getStoryById = (req, res) => {
    const story = db.find(story => story.id === parseInt(req.params.id));
    if (story) {
        res.json(story);
    } else {
        res.status(404).json({ message: `Story with id ${req.params.id} not found` });
    }
}

module.exports = {
    getAllStories,
    getStoryById
}