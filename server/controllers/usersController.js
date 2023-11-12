const User = require('../model/User')

const getAllUsers = async (req, res) => {
    const users = await User.find()
    if(!users) return res.status(204).json({ 'message': 'No users found' })
    res.json(users)
}

const updateUser = async (req, res) => {
    // user id required in request
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'User ID required' })
    }
    
    // check if user exists
    const reqUser = await User.findOne({ _id: req.body.id }).exec()
    if(!reqUser){
        return res.status(204).json({ 'message': 'User with that ID does not exist' })
    }

    if (req?.body?.username) reqUser.username = req?.body?.username
    if (req?.body?.bio) reqUser.bio = req?.body?.bio
    if(req?.body?.profilepic) reqUser.profilepic = req?.body?.profilepic
    if (req.body?.mode) reqUser.mode = req?.body?.mode
    if (req.body?.language) reqUser.language = req?.body?.language
    if (req.body?.badges) reqUser.badges = req?.body?.badges
    if (req.body?.finishedStories) reqUser.finishedStories = req.body?.finishedStories

    const result = await reqUser.save()

    return res.status(201).json(reqUser)
}

const deleteUser = async (req, res) => {
    // check for id to delete
    if (!req?.body?.id) { return res.status(400).json({ 'message': 'User ID required' })}

    // check if user exists
    const reqUser = await User.findOne({ _id: req.body.id }).exec()
    if (!reqUser) {
        return res.status(204).json({ 'message': 'User with that ID does not exist' })
    }

    await reqUser.deleteOne({ _id: req.body.id })
    res.status(201).json({ 'message': `Deleted ${reqUser}` })
}

module.exports = { 
    getAllUsers,  
    updateUser, 
    deleteUser,
}