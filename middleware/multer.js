const multer = require("multer")

const storage = multer.memoryStorage();

const multerUpload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    }
})

const fileUpload = multerUpload.fields([
    { name: "profileImg", maxCount: 1 }, { name: "idCard", maxCount: 1 }, { name: "certificate", maxCount: 1 }
])
const uploadSingleFile = multerUpload.single("image")

module.exports = {
    fileUpload,
    uploadSingleFile
}