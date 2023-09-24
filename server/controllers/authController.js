const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { jwt_expire_time, db } = require('../config/databaseConfig.js');

const usersData = {
    users: db,
    setUsers: (newUsers) => { this.users = newUsers }
}

const handleLogin = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ 'message': 'Email and Password are required.' })

    const foundUser = usersData.users.find((user) => user.email === email)
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
        res.json({ foundUser })
    } else {
        res.sendStatus(401)
    }
}

module.exports = {
    handleLogin
}