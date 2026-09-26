const jwt = require("jsonwebtoken")

function verifySuperAdmin(req, res, next) {
    let token = req.headers.authorization
    try {
        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (["Super Admin"].includes(decode.data.role))
            next()
        else {
            res.status(401).send({
                result: "Fail",
                reason: "You Are Not Authorized to Access This API"
            })
        }
    } catch (error) {
        res.status(401).send({
            result: "Fail",
            reason: error.message === "invalid signature" || error.message === "jwt must be provided" ? "You Are Not Authorized To Access This API" : "Your Login Session Has Been Expired, Please Login Agin"
        })
    }
}

function verifyAdmin(req, res, next) {
    let token = req.headers.authorization
    try {
        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (["Super Admin", "Admin"].includes(decode.data.role))
            next()
        else {
            res.status(401).send({
                result: "Fail",
                reason: "You Are Not Authorized to Access This API"
            })
        }
    } catch (error) {
        res.status(401).send({
            result: "Fail",
            reason: error.message === "invalid signature" || error.message === "jwt must be provided" ? "You Are Not Authorized To Access This API" : "Your Login Session Has Been Expired, Please Login Agin"
        })
    }
}

function verifyUser(req, res, next) {
    let token = req.headers.authorization
    try {
        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (["Super Admin", "Admin", "User"].includes(decode.data.role))
            next()
        else {
            res.status(401).send({
                result: "Fail",
                reason: "You Are Not Authorized to Access This API"
            })
        }
    } catch (error) {
        res.status(401).send({
            result: "Fail",
            reason: error.message === "invalid signature" || error.message === "jwt must be provided" ? "You Are Not Authorized To Access This API" : "Your Login Session Has Been Expired, Please Login Agin"
        })
    }
}


module.exports = {
    verifySuperAdmin,
    verifyAdmin,
    verifyUser
}