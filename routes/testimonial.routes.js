const TestimonialRouter = require("express").Router()
const { verifyAdmin } = require("../middleware/auth.middleware")
const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../controllers/testimonial.controller")

TestimonialRouter.post("", verifyAdmin, createRecord)
TestimonialRouter.get("", getRecord)
TestimonialRouter.get("/:_id", getSingleRecord)
TestimonialRouter.put("/:_id", verifyAdmin, updateRecord)
TestimonialRouter.delete("/:_id", verifyAdmin, deleteRecord)

module.exports = TestimonialRouter