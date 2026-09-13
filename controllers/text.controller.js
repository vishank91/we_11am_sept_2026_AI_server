const Text = require("../models/text.models")
const { xai } = require('@ai-sdk/xai')
const { generateText } = require('ai')


async function createTitle(prompt) {
    const { text, response } = await generateText({
        model: xai.responses('grok-4.6'),
        system: "You are Grok, an AI agent built to answer helpful questions.",
        prompt: `Please Create Exact 3-5 Words Title for the Following Prompt  "${prompt}"`,
    })
    if (response.id)
        return text
    else
        return ""
}

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
        let title = req.body._id && req.body._id !== "-1" ? "Old" : await createTitle(req.body.prompt)
        if (title) {
            const { text, response } = await generateText({
                model: xai.responses('grok-4.6'),
                system: "You are Grok, an AI agent built to answer helpful questions.",
                prompt: req.body.prompt,
            });
            if (response.id) {
                if (req.body._id && req.body._id !== "-1") {
                    let data = await Text.findOne({ _id: req.body._id })
                    data.chat.push({
                        prompt: req.body.prompt,
                        response: text
                    })
                    await data.save()
                    res.send({
                        result: 'Done',
                        data: data
                    })
                }
                else {
                    let data = new Text({
                        user: req.body.userid,
                        title: title,
                    })
                    data.chat = [{
                        prompt: req.body.prompt,
                        response: text
                    }]
                    await data.save()
                    res.send({
                        result: "Done",
                        data: data
                    })
                }
            }
            else {
                res.status(400).send({
                    result: "Fail",
                    reason: "Unable to Generate Content, Please Make Sure Your Promot Follow Our Community Guidelines"
                })
            }
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
        let data = await Text.find({ user: req.params._id }).sort({ _id: -1 })
        res.send({
            result: "Done",
            count: data.length,
            data: data
        })
    } catch (error) {
        // console.log(error)
        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        })
    }
}

async function updateRecord(req, res) {
    try {
        let data = await Text.findOne({ _id: req.params._id })
        if (data) {

            const { text, response } = await generateText({
                model: xai.responses('grok-4.6'),
                system: "You are Grok, an AI agent built to answer helpful questions.",
                prompt: req.body.prompt,
            });

            if (response.id) {
                data.chat = data.chat.slice(0, req.body.index)
                data.chat.push({
                    prompt: req.body.prompt,
                    response: text
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
        else {
            res.status(401).send({
                result: "Fail",
                reason: "No Chat Found"
            })
        }
    } catch (error) {
        // console.log(error)
        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        })
    }
}

async function deleteRecord(req, res) {
    try {
        let data = await Text.findOne({ _id: req.params._id })
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
    updateRecord: updateRecord,
}