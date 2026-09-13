const mongoose = require("mongoose")

const ImageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    prompt: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    }
}, { timestamps: true })
const Image = new mongoose.model("Image", ImageSchema)
module.exports = Image