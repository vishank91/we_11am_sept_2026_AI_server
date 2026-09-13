const mongoose = require("mongoose")

const TextSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User Id Must Required"]
    },
    title: {
        type: String,
        default: ""
    },
    chat: []
}, { timestamps: true })
const Text = new mongoose.model("Text", TextSchema)
module.exports = Text