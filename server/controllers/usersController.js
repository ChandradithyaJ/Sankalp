const { jwt_expire_time, salt, db } = require('../config/databaseConfig.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

// Testing with JSON files
const fsPromises = require('fs').promises
const path = require('path')

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
    }else if(!req?.body?.token){
        return res.status(400).json({ 'message': 'Token required' })
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
    // validity check includes jwt verification
    // jwt and id required
    if (!req?.body?.id) {return res.status(400).json({ 'message': 'User ID required' })}

    // check if user exists
    const reqUser = usersData.users.find((user) => user.id === req?.body?.id)
    if (!reqUser) {
        return res.status(400).json({ 'message': 'User does not exist' })
    }

    const filteredUsers = usersData.users.filter((user) => user.id !== req?.body?.id)
    usersDB.setUsers([...filteredUsers])
    res.status(201).json({ 'message': `Deleted ${reqUser}` })
}

const updateToken = (req, res) => {
    // in case of token expiry (before expiry), user id and prev token is sent to update token

    // validity check includes jwt verification

    // jwt and id required
    if (!req?.body?.id) {return res.status(400).json({ 'message': 'User ID required' })}

    if (!req?.body?.token) {return res.status(400).json({ 'message': 'Token required' })}

    // check if user exists
    const reqUser = usersData.checkid(parseInt(req?.body?.id))

    if(!reqUser) {res.status(400).json({ 'message': 'User not found' })}

    // verify jwt
    jwt.verify(req?.body?.token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        try{
            if (reqUser.username !== user.username) {
                return res.status(400).json({ 'message': 'User not found' })
            }
            // update token
            const accessToken = jwt.sign(reqUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: jwt_expire_time })
            // return updated token
            res.status(201).json({ accessToken }, reqUser) // returning updated userdata and token for frontend
        } catch (err){
            return res.status(400).json({ 'message': 'Error in verifying token' })
        }

        // check if user is same
    })
}
module.exports = { 
    getAllUsers,  
    updateUser, 
    deleteUser,
    updateToken
}