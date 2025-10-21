const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"DogOwner"
    },
    dog:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "dog"
    },
    location: {
        type:String,
        required:true
    },
    time: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        maxlength: 60
    },
    assignTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DogWalkers"
    },
    status: {
        type: String,
        enum: ["Pending","Assigned","Completed"],
        default: "Pending"
    },
    tasks_price:{
        type:Number,
        default:0,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Task = mongoose.model("Tasks", taskSchema)

module.exports = {
    Task
}