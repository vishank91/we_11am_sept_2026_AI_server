const NewsletterRouter = require("express").Router()
const { verifyAdmin, verifySuperAdmin, verifyBuyer } = require("../middleware/auth.middleware")
const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord,
    unsubscribe
} = require("../controllers/newsletter.controller")

NewsletterRouter.post("", createRecord)
NewsletterRouter.get("", verifyAdmin, getRecord)
NewsletterRouter.get("/:_id", verifyAdmin, getSingleRecord)
NewsletterRouter.put("/:_id", verifyAdmin, updateRecord)
NewsletterRouter.delete("/:_id", verifySuperAdmin, deleteRecord)
NewsletterRouter.get("/unsubscibe/:_id", verifyBuyer, unsubscribe)

module.exports = NewsletterRouter