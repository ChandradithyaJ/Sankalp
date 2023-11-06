// User Schema for MongoDB

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const finishedStoriesSchema = new Schema({
    ID: {
        type: Object,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
})

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
        default: ''
    },
    mode: {
        type: String,
        default: 'dark'
    },
    language: {
        type: String,
        default: 'en'
    },
    finishedStories: [finishedStoriesSchema],
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