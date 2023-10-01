const User = require('../model/User')
const { jwt_expire_time } = require('../config/jwtConfig.js')
const jwt = require('jsonwebtoken');

const updateToken = async (req, res) => {
    // in case of token expiry, user id is sent to update the token

    // validity check includes JWT verification
    if (!req?.body?.id) { return res.status(400).json({ 'message': 'User ID required' }) }

    // check if user exists
    const reqUser = await User.findOne({ _id: req?.body?.id}).exec()

    if (!reqUser) return res.status(400).json({ 'message': 'User not found' })

    try {
        const accessToken = jwt.sign(
            reqUser,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: jwt_expire_time }
        )

        // return updated token
        res.status(201).json({ accessToken }) // returning updated userdata and token for frontend
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ 'message': 'Failed to update the token' })
    }
}

module.exports = { updateToken }