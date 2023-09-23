const { jwt_expire_time, salt, db } = require('../config/databaseConfig.js');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Testing with JSON files
const fsPromises = require('fs').promises
const path = require('path')

const usersData = {
    users: db,
    setUsers: (newUsers) => { this.users = newUsers }
}

const handleNewUser = async (req, res) => {
    // validity check
    if (!req?.body?.username || !req?.body?.email || !req?.body?.password) {
        return res.status(400).json({ 'message': 'Username, email and password are required' })
    }
    // check if user already exists
    if (usersData.users.find((user) => user.username === req?.body?.username)) {
        return res.status(400).json({ 'message': 'Username already exists' })
    }
    if (usersData.users.find((user) => user.email === req?.body?.email)) {
        return res.status(400).json({ 'message': 'A user with this email already exists' })
    }

    // hashing password
    try {
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

        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify([...usersData.users, newUser])
        )

        res.status(201).json({ accessToken })
    } catch (err) {
        console.error(err)
        res.status(400).json({ 'message': 'Error hashing password' })
    }
}

module.exports = {
    handleNewUser
}