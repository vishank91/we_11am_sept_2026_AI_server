const mongoose = require("mongoose")

const TestimonialSchema = new mongoose.Schema({
    star: {
        type: Number,
        default: 5
    },
    message: {
        type: String,
        required: [true, "Message Field is Mendatory"]
    }
})
const Testimonial = new mongoose.model("Testimonial", TestimonialSchema)
module.exports = Testimonial