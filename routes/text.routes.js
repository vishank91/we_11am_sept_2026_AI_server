const TextRouter = require("express").Router()

const {
    createRecord,
    // getRecord,
    // getSingleRecord,
    // updateRecord,
    // deleteRecord,
} = require("../controllers/text.controller")

TextRouter.post("/", createRecord)
// TextRouter.get("/", getRecord)
// TextRouter.get("/:_id", getSingleRecord)
// TextRouter.put("/:_id", updateRecord)
// TextRouter.delete("/:_id", deleteRecord)

module.exports = TextRouter