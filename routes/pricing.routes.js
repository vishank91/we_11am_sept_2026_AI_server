const PricingRouter = require("express").Router()
const { verifyAdmin, verifySuperAdmin } = require("../middleware/auth.middleware")
const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord,
} = require("../controllers/pricing.controller")

PricingRouter.post("/", createRecord)
PricingRouter.get("/", verifyAdmin, getRecord)
PricingRouter.get("/:_id", verifyAdmin, getSingleRecord)
PricingRouter.put("/:_id", verifyAdmin, updateRecord)
PricingRouter.delete("/:_id", verifySuperAdmin, deleteRecord)

module.exports = PricingRouter