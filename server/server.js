/*** Server run by Node and Express ***/

const express = require('express') // ExpressJS
const cors = require('cors')

const { corsOptions } = require('./config/corsOptions')
const verifyJWT = require('./middleware/verifyJWT')

const app = express() // main server component

const PORT = process.env.PORT || 3500 // running on PORT

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// built-in middleware for form data (urlencoded data)
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json())

// register route
app.use('/register', require('./routes/register'))
// login route
app.use('/auth', require('./routes/auth'))

// custom middleware for verifying JWTs
app.use(verifyJWT)
// users route
app.use('/users', require('./routes/api/users'))

// run the app on PORT
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))