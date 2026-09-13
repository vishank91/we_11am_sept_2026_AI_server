const User = require("../models/user.models")

const passwordValidator = require('password-validator');
const bcrypt = require("bcrypt")

const schema = new passwordValidator();

// Add properties to it
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase(1)                             // Must have at least 1 uppercase letter
    .has().lowercase(1)                             // Must have at least 1 lowercase letter
    .has().digits(1)                                // Must have at least 1 digit
    .has().symbols(1)                               // Must have at least 1 special Character
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123', 'Admin@123', 'User@123']); // Blacklist these values


async function createRecord(req, res) {
    if (schema.validate(req.body.password)) {
        bcrypt.hash(req.body.password, 12, async (error, hash) => {
            if (error) {
                res.status(500).send({
                    result: 'Fail',
                    reason: 'Internal Server Error'
                })
            }
            else {
                try {
                    let data = new User(req.body)
                    data.password = hash
                    await data.save()
                    res.send({
                        result: 'Done',
                        data: data
                    })
                }
                catch (error) {
                    // console.log(error.errors)
                    let errorMessage = {}
                    if (error.keyValue) {
                        error.keyValue['username'] ? errorMessage['username'] = "Username Already Taken" : ""
                        error.keyValue['email'] ? errorMessage['email'] = "Email Address Already Taken" : ""
                    }
                    else
                        Object.keys(error.errors).forEach(key => errorMessage[key] = error.errors[key].message)

                    res.status(400).send({
                        result: 'Fail',
                        reason: errorMessage
                    })
                }
            }
        })
    }
    else {
        res.status(400).send({
            result: "Fail",
            reason: schema.validate(req.body.password, { details: true }).map(x => x.message.replaceAll("string", "password")).join(". ")
        })
    }
}

async function getRecord(req, res) {
    try {
        let data = await User.find().sort({ _id: -1 })
        res.send({
            result: "Done",
            count: data.length,
            data: data
        })
    } catch (error) {
        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        })
    }
}

async function getSingleRecord(req, res) {
    try {
        let data = await User.findOne({ _id: req.params._id })
        if (data) {
            res.send({
                result: "Done",
                data: data
            })
        }
        else {
            res.status(404).send({
                result: "Fail",
                reason: "No Record Found Against This Id"
            })
        }
    } catch (error) {
        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        })
    }
}

async function updateRecord(req, res) {
    try {
        let data = await User.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.username = req.body.username ?? data.username
            data.email = req.body.email ?? data.email
            data.phone = req.body.phone ?? data.phone
            data.role = req.body.role ?? data.role
            data.status = req.body.status ?? data.status
            await data.save()
            res.send({
                result: "Done",
                data: data
            })
        }
        else {
            res.status(404).send({
                result: "Fail",
                reason: "No Record Found Against This Id"
            })
        }
    } catch (error) {
        let errorMessage = {}
        if (error.keyValue) {
            error.keyValue['username'] ? errorMessage['username'] = "Username Already Taken" : ""
            error.keyValue['email'] ? errorMessage['email'] = "Email Address Already Taken" : ""
        }
        else
            Object.keys(error.errors).forEach(key => errorMessage[key] = error.errors[key].message)

        res.status(400).send({
            result: 'Fail',
            reason: errorMessage
        })
    }
}

async function deleteRecord(req, res) {
    try {
        let data = await User.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
            res.send({
                result: "Done"
            })
        }
        else {
            res.status(404).send({
                result: "Fail",
                reason: "No Record Found Against This Id"
            })
        }
    } catch (error) {
        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        })
    }
}

async function login(req, res) {
    try {
        let data = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.username }
            ]
        })
        if (data) {
            if (await bcrypt.compare(req.body.password, data.password)) {
                res.send({
                    result: "Done"
                })
            }
            else {
                res.status(401).send({
                    result: "Fail",
                    reason: "Invalid Username or Password"
                })
            }
        }
        else {
            res.status(401).send({
                result: "Fail",
                reason: "Invalid Username or Password"
            })
        }
    } catch (error) {
        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        })
    }
}

module.exports = {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord,
    login
}