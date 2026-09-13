const TextRouter = require("express").Router()

const {
    createRecord,
    getRecord,
    updateRecord,
    deleteRecord,
} = require("../controllers/text.controller")

TextRouter.post("/", createRecord)
TextRouter.get("/:_id", getRecord)
TextRouter.put("/:_id", updateRecord)
TextRouter.delete("/:_id", deleteRecord)

module.exports = TextRouter