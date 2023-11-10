// Verify if a JWT exists, and if it does, its validity

const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json('No JWT')   
    }
    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err){
                console.log('Unable to verify JWT')
                return res.sendStatus(403)
            }
            req.user = decoded.newUser?.username
            req.id = decoded.newUser?.id
            next()
        }
    )
}

module.exports = verifyJWT