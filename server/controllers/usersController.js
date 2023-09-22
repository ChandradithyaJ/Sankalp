const {Access_token_secret, jwt_expire_time, salt, db} = require('../config/databaseConfig.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//TODO:
//implementing db in json file
//to use mongoose abstractions later

const usersData = {
    //abstracting db
    //here db available from databaseConfig.js
    users: db.users,
    setUsers: (newUsers) => { db.users = newUsers },
    checkUser: (username) => { return db.users.find((user) => user.username === username) },
    checkid: (id) => { return db.users.find((user) => user.id === id) },
    checkEmail: (email) => {  return db.users.find((user) => user.email === email)}, 
    RemoveUser: (id) => { db.users = db.users.filter((user) => user.id !== id) },  
    numberOfUsers: db.users.length,

}

const getAllUsers = (req, res) => {
    res.status(200).json(usersData.users)
}
const createNewUser = (req, res) => {
    //validity check
    if (!req?.body?.username || !req?.body?.email || !req?.body?.password) {
        return res.status(400).json({ 'message': 'Username, email and password are required' })
    }
    //check if user already exists
    if (usersData.checkUser(req.body.username)||usersData.checkEmail(req.body.email)) {
        return res.status(400).json({ 'message': 'Username already exits/Mail already used' })
    }
    //hashing password
    bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) {
            return res.status(400).json({ 'message': 'Error in hashing password' })
        }
        const newUser = {
            id: usersData.users[usersData.users.length - 1].id + 1 || 1,
            username: req.body.username,
            password: hash,
            email: req.body.email,
            profilepic: null,
            badges: {
                firstStory: false,
                firstThree: false
            }
        }
        usersData.setUsers([...usersData.users, newUser])
        const accessToken = jwt.sign(newUser, Access_token_secret, { expiresIn: jwt_expire_time })
        res.status(201).json({accessToken}, newUser)//returning userdata and token for frontend
    })
}
const updateUser = (req, res) => {
    //validity check includes jwt verification usrname & passwd not required
    //jwt and id required
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'User ID required' })
    }else if(!req?.body?.token){
        return res.status(400).json({ 'message': 'Token required' })
    }
    //check if user exists
    const reqUser = usersData.checkid(parseInt(req.body.id))
    //verify jwt
    jwt.verify(req.body.token, Access_token_secret, (err, user) => {
        if (err) {
            return res.status(400).json({ 'message': 'Error in verifying token' })
        }
        //check if user is same
        if(reqUser.username!==user.username){
            return res.status(400).json({ 'message': 'User not found' })
        }
        //update user
        reqUser.username = req.body.username?req.body.username:reqUser.username
        //hash is required for password
        if(req.body.password){
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) {
                    return res.status(400).json({ 'message': 'Error in hashing password' })
                }
                reqUser.password = hash
            })
        }
        reqUser.email = req.body.email?req.body.email:reqUser.email
        reqUser.profilepic = req.body.profilepic?req.body.profilepic:reqUser.profilepic
        reqUser.badges = req.body.badges?req.body.badges:reqUser.badges
        //update db
        const filteredUsers = usersData.users.filter((user) => user.id !== parseInt(req.body.id))//TODO while updating mongodb update abstraction
        const unsortedUsersArray = [...filteredUsers, reqUser]
        usersData.setUsers(unsortedUsersArray.sort((a, b) => {
            a.id > b.id ? 1 :
            a.id < b.id ? -1 :
            0
        }))
        //return updated user
        res.status(201).json(reqUser)//returning updated userdata
    })
}

const deleteUser = (req, res) => {
    //validity check includes jwt verification
    //jwt and id required
    if (!req?.body?.id) {return res.status(400).json({ 'message': 'User ID required' })}
    if (!req?.body?.token) {return res.status(400).json({ 'message': 'Token required' })}
    //check if user exists
    const reqUser = usersData.checkid(parseInt(req.body.id))
    if(!reqUser) res.status(400).json({ 'message': 'User not found' })
    //verify jwt
    jwt.verify(req.body.token, Access_token_secret, (err, user) => {
        if (err) {
            return res.status(400).json({ 'message': 'Error in verifying token' })
        }
        //check if user is same
        if(reqUser.username!==user.username){
            return res.status(400).json({ 'message': 'User not found' })
        }
        //delete user
        usersData.RemoveUser(req.body.id)
        //return "deleted user"
        res.status(201).json({ "id": req.body.id, "message": "User deleted"});
    })
}
const updateToken = (req, res) => {//in case of token expiry(before expiry) usrid and prev token is sent to update token
    //validity check includes jwt verification
    //jwt and id required
    if (!req?.body?.id) {return res.status(400).json({ 'message': 'User ID required' })}
    if (!req?.body?.token) {return res.status(400).json({ 'message': 'Token required' })}
    //check if user exists
    const reqUser = usersData.checkid(parseInt(req.body.id))
    if(!reqUser) {res.status(400).json({ 'message': 'User not found' })}
    //verify jwt
    jwt.verify(req.body.token, Access_token_secret, (err, user) => {
        if (err) {
            return res.status(400).json({ 'message': 'Error in verifying token' })
        }
        //check if user is same
        if(reqUser.username!==user.username){
            return res.status(400).json({ 'message': 'User not found' })
        }
        //update token
        const accessToken = jwt.sign(reqUser, Access_token_secret, { expiresIn: jwt_expire_time })
        //return updated token
        res.status(201).json({accessToken}, reqUser)//returning updated userdata and token for frontend
    })
}
module.exports = { 
    getAllUsers, 
    createNewUser, 
    updateUser, 
    deleteUser,
    updateToken
}