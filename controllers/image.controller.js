const Image = require("../models/image.models")
const { xai } = require('@ai-sdk/xai')
const { generateImage } = require('ai')
const fs = require("fs")
const path = require("path")

async function createRecord(req, res) {
    if (!req.body.userid || req.body.userid === "") {
        res.status(400).send({
            result: "Fail",
            reason: "User Id Is Mendatory"
        })
    }

    if (!req.body.prompt || req.body.prompt === "") {
        res.status(400).send({
            result: "Fail",
            reason: "Please Provide a Prompt to Generate Content"
        })
    }
    else {
        const { image } = await generateImage({
            model: xai.image("grok-imagine-image-2.0"),
            prompt: req.body.prompt,
            aspectRatio: req.body.ratio ?? "16:9",
            providerOptions: {
                xai: { resolution: "2k" },
            }
        });
        console.log(image)
        if (image.base64) {
            const imageBuffer = Buffer.from(image.base64, "base64");
            const file = path.join("generated_data/image/" + "img" + Date.now() + ".png")
            fs.writeFileSync(file, imageBuffer);

            let data = new Image({
                user: req.body.userid,
                prompt: req.body.prompt,
                image: file,
            })
            await data.save()
            res.send({
                result: "Done",
                data: data
            })
        }
        else {
            res.status(400).send({
                result: "Fail",
                reason: "Unable to Generate Content, Please Make Sure Your Promot Follow Our Community Guidelines"
            })
        }
    }
}

async function getRecord(req, res) {
    try {
        let data = await Image.find({ user: req.params._id }).sort({ _id: -1 })
        res.send({
            result: "Done",
            count: data.length,
            data: data
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        })
    }
}


async function deleteRecord(req, res) {
    try {
        let data = await Image.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
        }
        res.send({
            result: "Done"
        })
    } catch (error) {
        // console.log(error)
        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        })
    }
}

module.exports = {
    createRecord: createRecord,
    getRecord: getRecord,
    deleteRecord: deleteRecord,
}