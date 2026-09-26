const ImageRouter = require("express").Router()
const { verifyUser } = require("../middleware/auth.middleware")
const {
    createRecord,
    getRecord,
    deleteRecord,
} = require("../controllers/image.controller")

ImageRouter.post("/", verifyUser, createRecord)
ImageRouter.get("/:_id", verifyUser, getRecord)
ImageRouter.delete("/:_id", verifyUser, deleteRecord)

module.exports = ImageRouter