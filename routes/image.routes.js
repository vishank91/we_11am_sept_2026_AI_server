const ImageRouter = require("express").Router()

const {
    createRecord,
    getRecord,
    deleteRecord,
} = require("../controllers/image.controller")

ImageRouter.post("/", createRecord)
ImageRouter.get("/:_id", getRecord)
ImageRouter.delete("/:_id", deleteRecord)

module.exports = ImageRouter