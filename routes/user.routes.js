const UserRouter = require("express").Router()

const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord,
    login
} = require("../controllers/user.controller")

UserRouter.post("/", createRecord)
UserRouter.get("/", getRecord)
UserRouter.get("/:_id", getSingleRecord)
UserRouter.put("/:_id", updateRecord)
UserRouter.delete("/:_id", deleteRecord)
UserRouter.post("/login", login)

module.exports = UserRouter