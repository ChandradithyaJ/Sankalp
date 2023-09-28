const db = require('../model/stories.json');//TODO include this in databaseConfig.js

module.exports = {
    getAllStories: (req, res) => {
        res.status(200).json(db);
    },
    getStoryById: (req, res) => {
        const story = db.find(story => story.id === parseInt(req.params.id));
        if (story) {
            res.json(story);
        } else {
            res.status(404).json({ message: `Story with id ${req.params.id} not found` });
        }
    }
}