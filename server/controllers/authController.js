const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { jwt_expire_time } = require('../config/jwtConfig.js');

const handleLogin = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ 'message': 'Email and Password are required.' })

    const reqUser = await User.findOne({ email: email }).exec()
    const foundUser = reqUser?.toObject()
    if (!foundUser) return res.sendStatus(401) // unauthorized

    const match = await bcrypt.compare(password, foundUser.password)
    if (match) {
        // create JWT
        const accessToken = jwt.sign(
            foundUser,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: jwt_expire_time }
        )
        foundUser['accessToken'] = accessToken
        return res.status(200).json({ foundUser })
    } else {
        return res.sendStatus(401)
    }
}

module.exports = {
    handleLogin
}