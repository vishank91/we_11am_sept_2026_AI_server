const FeatureRouter = require("express").Router()
const { verifyAdmin, verifySuperAdmin } = require("../middleware/auth.middleware")
const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../controllers/feature.controller")

FeatureRouter.post("", verifyAdmin, createRecord)
FeatureRouter.get("", getRecord)
FeatureRouter.get("/:_id", getSingleRecord)
FeatureRouter.put("/:_id", verifyAdmin, updateRecord)
FeatureRouter.delete("/:_id", verifySuperAdmin, deleteRecord)

module.exports = FeatureRouter