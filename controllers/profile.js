const { TryCatch } = require("../middleware/error");
const { Dog } = require("../models/dog");
const { DogOwner } = require("../models/DogOwner");
const { DogWalker } = require("../models/DogWalker");
const { Task } = require("../models/Task");
const { User } = require("../models/user");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { ErrorHandler } = require("../utils/utility");
require("dotenv").config()

const addProfile = TryCatch(async (req, res, next) => {

    const { fullName, address, postCode, accountNumber, bsb, name } = req.body;
    const { id } = req.user

    const user = await User.findById(id)

    if (!user) {
        return next(new ErrorHandler("User not Found"))
    }

    const { profileImg, idCard, certificate } = req.files

    if (!profileImg || !idCard || !certificate) {
        return next(new ErrorHandler("Please Upload All Files"))
    }

    const [profileImgUrl, idCardimgUrl, certificateImgUrl] = await Promise.all([uploadImageToCloudinary(profileImg[0].buffer, process.env.FOLDER_NAME), uploadImageToCloudinary(idCard[0].buffer, process.env.FOLDER_NAME), uploadImageToCloudinary(certificate[0].buffer, process.env.FOLDER_NAME)]);

    let newUser;

    if (user.role == "Dog Owner") {
        newUser = await DogOwner.findOne({ userId: id });
        if (newUser) {
            return next(new ErrorHandler("Profile Already Created", 400))
        }
        newUser = await DogOwner.create({ userId: id, fullName, address, postCode, accountNumber, bsb, name, profileImg: profileImgUrl.secure_url, idCard: idCardimgUrl.secure_url, certificate: certificateImgUrl.secure_url })
    } else {
        newUser = await DogWalker.findOne({ userId: id });
        if (newUser) {
            return next(new ErrorHandler("Profile Already Created", 400))
        }
        newUser = await DogWalker.create({ userId: id, fullName, address, postCode, accountNumber, bsb, name, profileImg: profileImgUrl.secure_url, idCard: idCardimgUrl.secure_url, certificate: certificateImgUrl.secure_url })
    }

    newUser = await User.findById(id)


    return res.status(200).json({
        success: true,
        user: newUser
    })
})

const addDog = TryCatch(async (req, res, next) => {

    const { id } = req.user;
    const { name, breed, allergies, habits, instruction } = req.body;

    const file = req.file

    if (!file) {
        return next(new ErrorHandler("Please Upload the Dog image", 401))
    }
    if (file.size > 5000000) {
        return next(new ErrorHandler("file cant't be more than 5MB", 401))
    }


    const imageUrl = await uploadImageToCloudinary(file.buffer, process.env.FOLDER_NAME)
    const newDog = await Dog.create({ name, breed, allergies, habits, instruction, image: imageUrl.secure_url })
    const updatedUser = await DogOwner.findOneAndUpdate({ userId: id }, { $push: { Dogs: newDog._id } }).populate("userId").populate("Dogs")

    return res.status(200).json({
        success: true,
        message: "Dog Added Successfully",
        user: updatedUser
    })
})

const updateDogWalkerProfile = TryCatch(async (req, res, next) => {
    const { id, role } = req.user

    const { hourlyRate, daysAvailable, timeAvailable, serviceArea } = req.body

    if (role != 'Dog Walker') {
        return next(new ErrorHandler("Your are not allowed to access this route", 400))
    }

    const user = await DogWalker.findOne({userId:id})

    if (!user) {
        return next(new ErrorHandler("User not Found", 404))
    }

    const updatedProfile = await DogWalker.findOneAndUpdate({ userId: id }, { hourlyRate, daysAvailable, timeAvailable, serviceArea }).populate("userId")

    return res.status(200).json({
        success: true,
        message: "Profile Created Successfully",
        user: updatedProfile
    })
})

const getUserHomeData = TryCatch(async (req, res, next) => {
    const { id, role } = req.user;

    console.log(id,role)

    let user

    console.log("Hello")

    if (role == "Dog Owner") {
        user = await DogOwner.findOne({ userId: id })
            .populate('userId')
            .populate("Dogs")
            .exec();

        console.log(user)
        return res.status(200).json({
            success: true,
            user,
        })
    } else {
        user = await DogWalker.findOne({ userId: id }).populate("userId")
        const tasks = await Task.find().populate("user").populate("dog")
        return res.status(200).json({
            success: true,
            user,
            tasks
        })
    }
})


module.exports = {
    addDog,
    updateDogWalkerProfile,
    addProfile,
    getUserHomeData
}