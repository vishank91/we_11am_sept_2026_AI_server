const mongoose = require("mongoose")

const PricingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Pricing Plan Name is Mendatory"]
    },
    basePrice: {
        type: Number,
        required: [true, "Pricing Plan Base Price is Mendatory"]
    },
    discount: {
        type: Number,
        required: [true, "Pricing Plan Discount is Mendatory"]
    },
    finalPrice: {
        type: Number,
        required: [true, "Pricing Plan Final Price is Mendatory"]
    },
    text: {
        type: Boolean,
        default: false
    },
    image: {
        type: Boolean,
        default: false
    },
    imageToImage: {
        type: Boolean,
        default: false
    },
    video: {
        type: Boolean,
        default: false
    },
    speech: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })
const Pricing = new mongoose.model("Pricing", PricingSchema)
module.exports = Pricing