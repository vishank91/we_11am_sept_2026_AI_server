const TextRouter = require("express").Router()
const { verifyUser } = require("../middleware/auth.middleware")
const {
    createRecord,
    getRecord,
    updateRecord,
    deleteRecord,
} = require("../controllers/text.controller")

TextRouter.post("/",verifyUser, createRecord)
TextRouter.get("/:_id",verifyUser, getRecord)
TextRouter.put("/:_id",verifyUser, updateRecord)
TextRouter.delete("/:_id",verifyUser, deleteRecord)

module.exports = TextRouter