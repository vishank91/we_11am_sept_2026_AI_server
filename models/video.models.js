const mongoose = require("mongoose")

const VideoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    prompt: {
        type: String,
        default: ""
    },
    video: {
        type: String,
        default: ""
    }
}, { timestamps: true })
const Video = new mongoose.model("Video", VideoSchema)
module.exports = Video