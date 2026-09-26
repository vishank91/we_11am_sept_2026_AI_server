const Router = require("express").Router()

const UserRouter = require("./user.routes")
const TextRouter = require("./text.routes")
const ImageRouter = require("./image.routes")
const VideoRouter = require("./video.routes")
const SpeechRouter = require("./speech.routes")
const ImageToImageRouter = require("./image-to-image.routes")
const PricingRouter = require("./pricing.routes")

Router.use("/user", UserRouter)
Router.use("/text", TextRouter)
Router.use("/image", ImageRouter)
Router.use("/image2", ImageToImageRouter)
Router.use("/video", VideoRouter)
Router.use("/speech", SpeechRouter)
Router.use("/pricing", PricingRouter)

module.exports = Router