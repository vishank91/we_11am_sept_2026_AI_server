const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Field is Mendatory"]
    },
    username: {
        type: String,
        required: [true, "User Name Field is Mendatory"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email Address Field is Mendatory"],
        unique: true
    },
    phone: {
        type: String,
        required: [true, "Phone Number Field is Mendatory"]
    },
    password: {
        type: String,
        required: [true, "Password Field is Mendatory"]
    },
    role: {
        type: String,
        default: 'User'
    },
    pricing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pricing",
        default: null
    },
    planStats: {
        type: Object,
        default: {}
    },
    status: {
        type: Boolean,
        default: true
    }
})
const User = new mongoose.model("User", UserSchema)
module.exports = User