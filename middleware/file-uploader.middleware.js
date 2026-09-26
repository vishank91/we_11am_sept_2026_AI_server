const multer = require("multer")
function generateUploader(folder) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `public/uploads/${folder}`)
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "_" + file.originalname)
        }
    })
    return multer({ storage: storage })
}
module.exports = {
    imageUploader: generateUploader('image'),
}