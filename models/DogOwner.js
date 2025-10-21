const mongoose = require("mongoose");

const dogOwnerSchema = new mongoose.Schema({
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
    Dogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dogs" }],
});

const DogOwner = mongoose.model("DogOwner", dogOwnerSchema);
module.exports = { DogOwner };
