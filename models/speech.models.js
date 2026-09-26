const mongoose = require("mongoose")

const SpeechSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    prompt: {
        type: String,
        default: ""
    },
    speech: {
        type: String,
        default: ""
    }
}, { timestamps: true })
const Speech = new mongoose.model("Speech", SpeechSchema)
module.exports = Speech