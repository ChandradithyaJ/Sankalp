const Story = require('../model/Story')

const getAllStories = async (req, res) => {
    const stories = await Story.find()
    if (!stories) return res.status(204).json({ 'message': 'No stories found' })
    res.json(stories)
}

const getStoryById = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'Story ID required' })
    }

    const reqStory = await Story.findOne({ _id: req.body.id }).exec()
    if (reqStory) {
        res.json(reqStory);
    } else {
        res.status(404).json({ message: `Story with id ${req.body.id} not found` });
    }
}

module.exports = {
    getAllStories,
    getStoryById
}