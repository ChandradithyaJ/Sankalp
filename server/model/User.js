// User Schema for MongoDB

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    profilepic: {
        type: String,
        default: null
    },
    mode: {
        type: String,
        default: 'dark'
    },
    badges: {
        firstStory: {
            type: Boolean,
            default: false
        },
        firstThree: {
            type: Boolean,
            default: false
        }
    }
})

module.exports = mongoose.model('User', userSchema)