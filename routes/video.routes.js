const VideoRouter = require("express").Router()

const {
    createRecord,
    getRecord,
    deleteRecord,
} = require("../controllers/video.controller")

VideoRouter.post("/", createRecord)
VideoRouter.get("/:_id", getRecord)
VideoRouter.delete("/:_id", deleteRecord)

module.exports = VideoRouter