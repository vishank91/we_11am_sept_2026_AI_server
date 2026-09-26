const SpeechRouter = require("express").Router()
const { verifyUser } = require("../middleware/auth.middleware")
const {
    createRecord,
    getRecord,
    deleteRecord,
} = require("../controllers/speech.controller")

SpeechRouter.post("/",verifyUser, createRecord)
SpeechRouter.get("/:_id",verifyUser, getRecord)
SpeechRouter.delete("/:_id",verifyUser, deleteRecord)

module.exports = SpeechRouter