const { jwt_expire_time, salt, db } = require('../config/databaseConfig.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const usersData = {
    users: db,
    setUsers: (newUsers) => { this.users = newUsers },
    checkUser: (username) => { return this.users?.find((user) => user.username === username) },
    checkid: (id) => { return this.users?.find((user) => user.id === id) },
    checkEmail: (email) => {  return this.users?.find((user) => user.email === email)}, 
    RemoveUser: (id) => { users = this.users?.filter((user) => user.id !== id) },  
}

const getAllUsers = (req, res) => {
    res.status(200).json(usersData.users)
}

const createNewUser = async (req, res) => {
    // validity check
    if (!req?.body?.username || !req?.body?.email || !req?.body?.password) {
        return res.status(400).json({ 'message': 'Username, email and password are required' })
    }
    // check if user already exists
    if (usersData.checkUser(req?.body?.username) || usersData.checkEmail(req?.body?.email)) {
        return res.status(400).json({ 'message': 'Username already exits/Mail already used' })
    }
    // hashing password
    try{
        const hashedPwd = await bcrypt.hash(req?.body?.password, salt)
        const newUser = {
            id: usersData.users[usersData.users?.length - 1].id + 1 || 1,
            username: req?.body?.username,
            password: hashedPwd,
            email: req?.body?.email,
            profilepic: null,
            badges: {
                firstStory: false,
                firstThree: false
            }
        }
        usersData.setUsers([...usersData.users, newUser])
        const accessToken = jwt.sign(
            newUser,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: jwt_expire_time }
        )
        res.status(201).json({ accessToken })
    } catch (err) {
        console.error(err)
        res.status(400).json({ 'message': 'Error hashing password'})
    }
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
    const reqUser = usersData.checkid(parseInt(req?.body?.id))
    // verify jwt
    jwt.verify(req?.body?.token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        try{
            // check if user is same
            if (reqUser.username !== user.username) {
                return res.status(400).json({ 'message': 'User not found' })
            }
            // update user
            reqUser.username = req?.body?.username ? req?.body?.username : reqUser.username
            // hash is required for password
            if (req?.body?.password) {
                bcrypt.hash(req?.body?.password, salt, (err, hash) => {
                    try {
                        reqUser.password = hash
                    } catch (err) {
                        return res.status(400).json({ 'message': 'Error in hashing password' })
                    }
                })
            }
            reqUser.profilepic = req?.body?.profilepic ? req?.body?.profilepic : reqUser.profilepic
            reqUser.badges = req?.body?.badges ? req?.body?.badges : reqUser.badges

            // update db
            const filteredUsers = usersData.users.filter((user) => user.id !== parseInt(req?.body?.id))
            const unsortedUsersArray = [...filteredUsers, reqUser]
            usersData.setUsers(unsortedUsersArray.sort((a, b) => {
                a.id > b.id ? 1 :
                a.id < b.id ? -1 :
                0
            }))
            // return updated user
            res.status(201).json(reqUser)// returning updated userdata
        } catch (err) {
            return res.status(400).json({ 'message': 'Error in verifying token' })
        }
    })
}

const deleteUser = (req, res) => {
    // validity check includes jwt verification
    // jwt and id required
    if (!req?.body?.id) {return res.status(400).json({ 'message': 'User ID required' })}

    if (!req?.body?.token) {return res.status(400).json({ 'message': 'Token required' })}

    // check if user exists
    const reqUser = usersData.checkid(parseInt(req?.body?.id))

    if(!reqUser) res.status(400).json({ 'message': 'User not found' })

    // verify jwt
    jwt.verify(req?.body?.token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        try{
            // check if user is same
            if (reqUser.username !== user.username) {
                return res.status(400).json({ 'message': 'User not found' })
            }
            // delete user
            usersData.RemoveUser(req?.body?.id)
            // return "deleted user"
            res.status(201).json({ "id": req?.body?.id, "message": "User deleted" });
        } catch (err) {
            return res.status(400).json({ 'message': 'Error in verifying token' })
        }
    })
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
            res.status(201).json({ accessToken }, reqUser)// returning updated userdata and token for frontend
        } catch (err){
            return res.status(400).json({ 'message': 'Error in verifying token' })
        }

        // check if user is same
    })
}
module.exports = { 
    getAllUsers, 
    createNewUser, 
    updateUser, 
    deleteUser,
    updateToken
}