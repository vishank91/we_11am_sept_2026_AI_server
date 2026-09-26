const ImageToImageRouter = require("express").Router()
const { verifyUser } = require("../middleware/auth.middleware")

const { imageUploader } = require("../middleware/file-uploader.middleware")
const {
    createRecord,
    getRecord,
    deleteRecord,
} = require("../controllers/image-to-image.controller")

ImageToImageRouter.post("/", verifyUser, imageUploader.single("pic"), createRecord)
ImageToImageRouter.get("/:_id", verifyUser, getRecord)
ImageToImageRouter.delete("/:_id", verifyUser, deleteRecord)

module.exports = ImageToImageRouter