const mongoose = require("mongoose")

const dogSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    allergies: { type: [String], default: [] },
    habits:{ type: [String], default: [] },
    instruction: {
        type: String,
    },
    task_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tasks"
    }
})

const Dog = mongoose.model("dog", dogSchema)

module.exports = {
    Dog
}