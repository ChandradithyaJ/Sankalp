const { db } = require('../config/databaseConfig.js');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const usersData = {
    users: db,
    setUsers: (newUsers) => { this.users = newUsers },  
}

const getAllUsers = (req, res) => {
    res.status(200).json(usersData.users)
}

const updateUser = (req, res) => {
    // validity check includes jwt verification username & password not required
    // jwt and id required
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'User ID required' })
    }
    // check if user exists
    const reqUser = usersData.users.find((user) => user.id === req?.body?.id)
    if(!reqUser){
        return res.status(400).json({ 'message': 'User does not exist' })
    }

    if (req?.body?.username) reqUser.username = req?.body?.username
    if(req?.body?.profilepic) reqUser.profilepic = req?.body?.profilepic
    if (req.body?.badges) reqUser.badges = req?.body?.badges

    const filteredUsers = usersData.users.filter((user) => user.id !== req?.body?.id)
    const unsortedUsersArray = [...filteredUsers, reqUser]
    usersData.setUsers(unsortedUsersArray.sort((a, b) => {
        a.id > b.id ? 1 :
            a.id < b.id ? -1 :
                0
    }))

    return res.status(201).json(reqUser)
}

const deleteUser = (req, res) => {
    // check for id to delete
    if (!req?.body?.id) { return res.status(400).json({ 'message': 'User ID required' })}

    // check if user exists
    const reqUser = usersData.users.find((user) => user.id === req?.body?.id)
    if (!reqUser) {
        return res.status(400).json({ 'message': 'User does not exist' })
    }

    const filteredUsers = usersData.users.filter((user) => user.id !== req?.body?.id)
    usersData.setUsers([...filteredUsers])
    res.status(201).json({ 'message': `Deleted ${reqUser}` })
}

module.exports = { 
    getAllUsers,  
    updateUser, 
    deleteUser,
}