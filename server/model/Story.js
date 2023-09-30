// Story Schema for MongoDB

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema for a dialogue choice
const dialogueOptionSchema = new Schema({
    dialogueOption: {
        type: String,
        required: true
    },
    SankalpExplanation: {
        type: String,
        required: true
    },
    favourable: {
        type: Boolean,
        default: true
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
    dialogues: [dialogueSchema]
})

module.exports = mongoose.model('Story', storySchema)