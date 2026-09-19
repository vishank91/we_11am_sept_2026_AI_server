const Router = require("express").Router()

const UserRouter = require("./user.routes")
const TextRouter = require("./text.routes")
const ImageRouter = require("./image.routes")
const VideoRouter = require("./video.routes")

Router.use("/user", UserRouter)
Router.use("/text", TextRouter)
Router.use("/image", ImageRouter)
Router.use("/video", VideoRouter)

module.exports = Router