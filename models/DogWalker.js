const mongoose = require("mongoose");

const dogWalkerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    fullName: { type: String, required: true },
    state: { type: String, default: "Victoria" },
    address: { type: String, required: true },
    postCode: { type: String, required: true },
    accountNumber: { type: Number, required: true },
    bsb: { type: String, required: true },
    name: { type: String, required: true },
    profileImg: { type: String, required: true },
    idCard: { type: String, required: true },
    certificate: { type: String, required: true },
    hourlyRate: { type: String},
    daysAvailable: [{ type: String}],
    timeAvailable: {
        morningShift: { from: String, to: String },
        eveningShift: { from: String, to: String },
    },
    serviceArea: { type: String, maxlength: 4 },
});

const DogWalker = mongoose.model("DogWalker", dogWalkerSchema);
module.exports = { DogWalker };
