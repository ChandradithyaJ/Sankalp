const { jwt_expire_time, db } = require('../config/databaseConfig.js');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const usersData = {
    users: db,
    setUsers: (newUsers) => { this.users = newUsers },
}

const updateToken = (req, res) => {
    // in case of token expiry (before expiry), user id and prev token is sent to update token

    // validity check includes jwt verification

    // jwt and id required
    if (!req?.body?.id) { return res.status(400).json({ 'message': 'User ID required' }) }

    // check if user exists
    const reqUser = usersData.users.find((user) => user.id === req?.body?.id)

    if (!reqUser) res.status(400).json({ 'message': 'User not found' })

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