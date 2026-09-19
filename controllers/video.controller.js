const Video = require("../models/video.models");
const { xai } = require('@ai-sdk/xai');
const { experimental_generateVideo } = require("ai");

const fs = require("fs").promises;
const path = require("path");

async function createRecord(req, res) {
    try {
        const { userid, prompt, aspectRatio } = req.body;

        // 1. Input Validation
        if (!userid || typeof userid !== "string" || userid.trim() === "") {
            return res.status(400).send({
                result: "Fail",
                reason: "User Id Is Mandatory"
            });
        }

        if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
            return res.status(400).send({
                result: "Fail",
                reason: "Please Provide a Prompt to Generate Content"
            });
        }

        // 2. Video Generation Call
        const result = await experimental_generateVideo({
            model: xai.video("grok-imagine-video-1.5"),
            prompt,
            duration: 4,
            aspectRatio: aspectRatio ?? "16:9",
            providerOptions: {
                xai: {
                    resolution: "720p",
                    pollTimeoutMs: 15 * 60 * 1000,
                    pollIntervalMs: 5 * 1000,
                },
            },
        });

        // 3. Output Processing
        if (result.video?.uint8ArrayData) {
            const outputDir = path.join("generated_data", "video");
            const filePath = path.join(outputDir, `vid_${Date.now()}.mp4`);

            // Create directory asynchronously
            await fs.mkdir(outputDir, { recursive: true });

            // Convert Uint8Array to Buffer directly and write
            const videoBuffer = Buffer.from(result.video.uint8ArrayData);
            await fs.writeFile(filePath, videoBuffer);

            // 4. Save Record to Database
            const data = new Video({
                user: userid,
                prompt: prompt,
                video: filePath,
            });
            await data.save();

            return res.status(200).send({
                result: "Done",
                data: data
            });
        }

        return res.status(400).send({
            result: "Fail",
            reason: "Unable to Generate Content. Please make sure your prompt follows community guidelines."
        });

    } catch (error) {
        console.error("Error generating video:", error);
        return res.status(500).send({
            result: "Fail",
            reason: error.message || "An unexpected error occurred during generation."
        });
    }
}

async function getRecord(req, res) {
    try {
        const data = await Video.find({ user: req.params._id }).sort({ _id: -1 });
        return res.status(200).send({
            result: "Done",
            count: data.length,
            data: data
        });
    } catch (error) {
        console.error("Error fetching records:", error);
        return res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        });
    }
}

async function deleteRecord(req, res) {
    try {
        const data = await Video.findOne({ _id: req.params._id });
        if (!data) {
            return res.status(404).send({
                result: "Fail",
                reason: "Record Not Found"
            });
        }

        // Delete physical file from disk if path exists
        if (data.video) {
            try {
                await fs.unlink(data.video);
            } catch (fileErr) {
                console.warn("File cleanup warning (file may already be deleted):", fileErr.message);
            }
        }

        await data.deleteOne();

        return res.status(200).send({
            result: "Done"
        });
    } catch (error) {
        console.error("Error deleting record:", error);
        return res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error"
        });
    }
}

module.exports = {
    createRecord,
    getRecord,
    deleteRecord,
};