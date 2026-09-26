const Pricing = require("../models/pricing.models")

async function createRecord(req, res) {
    try {
        let data = new Pricing(req.body)
        await data.save()
        res.send({
            result: 'Done',
            data: data
        })
    }
    catch (error) {
        // console.log(error.errors)
        let errorMessage = {}
        Object.keys(error.errors).forEach(key => errorMessage[key] = error.errors[key].message)

        res.status(400).send({
            result: 'Fail',
            reason: errorMessage
        })
    }
}

async function getRecord(req, res) {
    try {
        let data = await Pricing.find().sort({ _id: -1 })
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
        let data = await Pricing.findOne({ _id: req.params._id })
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
        let data = await Pricing.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.basePrice = req.body.basePrice ?? data.basePrice
            data.discount = req.body.discount ?? data.discount
            data.finalPrice = req.body.finalPrice ?? data.finalPrice
            data.text = req.body.text ?? data.text
            data.image = req.body.image ?? data.image
            data.imageToImage = req.body.imageToImage ?? data.imageToImage
            data.video = req.body.video ?? data.video
            data.speech = req.body.speech ?? data.speech
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
        Object.keys(error.errors).forEach(key => errorMessage[key] = error.errors[key].message)

        res.status(400).send({
            result: 'Fail',
            reason: errorMessage
        })
    }
}

async function deleteRecord(req, res) {
    try {
        let data = await Pricing.findOne({ _id: req.params._id })
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

module.exports = {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord
}