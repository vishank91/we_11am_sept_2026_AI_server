const FaqRouter = require("express").Router()
const { verifyAdmin, verifySuperAdmin } = require("../middleware/auth.middleware")
const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../controllers/faq.controller")

FaqRouter.post("", verifyAdmin, createRecord)
FaqRouter.get("", getRecord)
FaqRouter.get("/:_id", getSingleRecord)
FaqRouter.put("/:_id", verifyAdmin, updateRecord)
FaqRouter.delete("/:_id", verifySuperAdmin, deleteRecord)

module.exports = FaqRouter