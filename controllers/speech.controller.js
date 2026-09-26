const Speech = require("../models/speech.models")

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
        const response = await fetch("https://api.x.ai/v1/tts", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.XAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: req.body.prompt,
                voice_id: req.body.voice_id ?? "eve",
                language: req.body.language ?? "en",
            }),
        });
        if (await response.arrayBuffer) {
            const buffer = Buffer.from(await response.arrayBuffer());
            const file = path.join("generated_data/speech/" + "speech" + Date.now() + ".mp3")
            fs.writeFileSync(file, buffer);

            let data = new Speech({
                user: req.body.userid,
                prompt: req.body.prompt,
                speech: file,
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
        let data = await Speech.find({ user: req.params._id }).sort({ _id: -1 })
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
        let data = await Speech.findOne({ _id: req.params._id })
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