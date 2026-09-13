const Text = require("../models/text.models")
const { xai } = require('@ai-sdk/xai')
const { generateText } = require('ai')


async function createTitle(prompt) {
    const { text, response } = await generateText({
        model: xai.responses('grok-4.6'),
        system: "You are Grok, an AI agent built to answer helpful questions.",
        prompt: `Please Create Exact 3-5 Words Title for the Following Prompt  "${prompt}"`,
    })
    console.log(text)
    if (response.id)
        return text
    else
        return ""
}

async function createRecord(req, res) {
    if (!req.body.userid || req.body.userid === "") {
        res.send({
            result: "Fail",
            reason: "User Id Is Mendatory"
        })
    }
    else {
        let title = req.body._id && req.body._id!=="-1" ? "Old" : await createTitle(req.body.prompt)
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
                res.send({
                    result: "Fail",
                    reason: "Internal Server Error"
                })
            }
        }
        else {
            res.send({
                result: "Fail",
                reason: "Internal Server Error"
            })
        }
    }
}

module.exports = {
    createRecord: createRecord,
}