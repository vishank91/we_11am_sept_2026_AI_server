const Router = require("express").Router()

const UserRouter = require("./user.routes")
const TextRouter = require("./text.routes")
const ImageRouter = require("./image.routes")

Router.use("/user", UserRouter)
Router.use("/text", TextRouter)
Router.use("/image", ImageRouter)

module.exports = Router