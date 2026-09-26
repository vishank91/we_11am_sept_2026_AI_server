const VideoRouter = require("express").Router()
const { verifyUser } = require("../middleware/auth.middleware")
const {
    createRecord,
    getRecord,
    deleteRecord,
} = require("../controllers/video.controller")

VideoRouter.post("/", verifyUser, createRecord)
VideoRouter.get("/:_id", verifyUser, getRecord)
VideoRouter.delete("/:_id", verifyUser, deleteRecord)

module.exports = VideoRouter