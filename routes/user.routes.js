const UserRouter = require("express").Router()
const { verifyUser,verifySuperAdmin } = require("../middleware/auth.middleware")
const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord,
    login
} = require("../controllers/user.controller")

UserRouter.post("/", createRecord)
UserRouter.get("/",verifyUser, getRecord)
UserRouter.get("/:_id",verifyUser, getSingleRecord)
UserRouter.put("/:_id",verifyUser, updateRecord)
UserRouter.delete("/:_id",verifySuperAdmin, deleteRecord)
UserRouter.post("/login", login)

module.exports = UserRouter