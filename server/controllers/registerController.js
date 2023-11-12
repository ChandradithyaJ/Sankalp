const User = require('../model/User')
const { jwt_expire_time, salt } = require('../config/jwtConfig.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleNewUser = async (req, res) => {
    // validity check
    if (!req?.body?.username || !req?.body?.email || !req?.body?.password) {
        return res.status(400).json({ 'message': 'Username, email and password are required' })
    }

    // check if user already exists
    const duplicateUsername = await User.findOne({ username: req?.body?.username }).exec()
    if (duplicateUsername) return res.status(409).json({ 'message': 'Username already exists' }) // Conflict

    const duplicateEmail = await User.findOne({ email: req?.body?.email }).exec()
    if (duplicateEmail) return res.status(409).json({ 'message': 'A user with this email already exists' }) // Conflict

    // hashing password
    try {
        const hashedPwd = await bcrypt.hash(req?.body?.password, salt)
        const newUser = {
            username: req?.body?.username,
            password: hashedPwd,
            email: req?.body?.email,
            bio: '',
            profilepic: "",
            mode: 'dark',
            language: 'en',
            badges: {
                firstStory: false,
                firstThree: false
            }
        }

        // create access token to use
        const accessToken = jwt.sign(
            newUser,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: jwt_expire_time }
        )

        const result = await User.create({
            username: req?.body?.username,
            password: hashedPwd,
            email: req?.body?.email,
        })

        newUser['accessToken'] = accessToken
        newUser['_id'] = result._id

        res.status(201).json({ newUser })
    } catch (err) {
        console.error(err)
        res.status(400).json({ 'message': 'Error hashing password' })
    }
}

module.exports = {
    handleNewUser
}