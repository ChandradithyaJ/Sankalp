// Story Schema for MongoDB

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema for a dialogue choice
const dialogueOptionSchema = new Schema({
    dialogueOption: {
        type: String,
        required: true
    },
    sankalpExplanation: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
})

// Schema for a single back-and-forth dialogue
const dialogueSchema = new Schema({
    npcDialogue: {
        type: String,
        required: true
    },
    dialogueOptions: [dialogueOptionSchema]
})

const storySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    situation: {
        type: String,
        required: true
    },
    storyPic: {
        type: String,
        required: true
    },
    dialogues: [dialogueSchema],
    totalScore: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Story', storySchema)