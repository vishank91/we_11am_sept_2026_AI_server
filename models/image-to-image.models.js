const mongoose = require("mongoose")

const ImageToImageSchema = new mongoose.Schema({
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
    },
    generatedImage: {
        type: String,
        default: ""
    }
}, { timestamps: true })
const ImageToImage = new mongoose.model("ImageToImage", ImageToImageSchema)
module.exports = ImageToImage