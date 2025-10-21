const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
        enum: ["Dog Owner", "Dog Walker"],
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
