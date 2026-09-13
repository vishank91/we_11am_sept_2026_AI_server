const Router = require("express").Router()

const UserRouter = require("./user.routes")
const TextRouter = require("./text.routes")

Router.use("/user", UserRouter)
Router.use("/text", TextRouter)

module.exports = Router