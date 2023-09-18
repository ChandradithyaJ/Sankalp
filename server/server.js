/*** Server run by Node and Express ***/

const express = require('express') // ExpressJS
const cors = require('cors')
const { corsOptions } = require('./config/corsOptions')

const app = express() // main server component

const PORT = process.env.PORT || 3500 // running on PORT

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// built-in middleware for form data
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json())

// run the app on PORT
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))