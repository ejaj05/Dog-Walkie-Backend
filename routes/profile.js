const express = require("express")
const { isAuth } = require("../middleware/auth")
const { uploadSingleFile, fileUpload } = require("../middleware/multer")
const { addDog, addProfile, getUserHomeData, updateDogWalkerProfile } = require("../controllers/profile")
const { validateHandler, addProfileValidator, dogValidator } = require("../lib/validator")

const profileRoute = express.Router()

profileRoute.post("/add-profile",isAuth,fileUpload,addProfileValidator(),validateHandler,addProfile)
profileRoute.post("/add-dog",isAuth,uploadSingleFile,dogValidator(),validateHandler,addDog)
profileRoute.post("/create-profile",isAuth,updateDogWalkerProfile)
profileRoute.get("/user-home-data",isAuth,getUserHomeData)


module.exports = {
    profileRoute
}