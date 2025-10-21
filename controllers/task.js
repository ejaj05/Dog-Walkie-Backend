const { mongoose } = require("mongoose");
const { TryCatch } = require("../middleware/error");
const { Dog } = require("../models/dog");
const { Task } = require("../models/Task");
const { ErrorHandler } = require("../utils/utility");

const createTask = TryCatch(async(req,res,next) => {
  
    const {userId,dog,location,time,notes} = req.body

    if(!dog || !location || !time){
        return next(new ErrorHandler("All Fields are requried"))
    }

    console.log(req.body)
    const task = await Task.create({user:userId,dog,location,time,notes})
    console.log(task)
    await Dog.findByIdAndUpdate({_id:dog},{task_id:task._id})

    return res.status(200).json({
        success:true,
        message:"Task Created Successfully"
    })
})

const deleteTask = TryCatch(async(req,res,next) => {
    const {role} = req.user
    const {id} = req.params
    if(role != "Dog Owner"){
        return next(new ErrorHandler("You are not allowed to access this route",400))
    }

    const task = await Task.findById(id)
    if(!task){
        return next(new ErrorHandler("Task not Found",404))
    }

    await Task.findByIdAndDelete({_id:id})

    return res.status(200).json({
        success:true,
        message: "Task Delete Successfully"
    })
})

const getTasks = TryCatch(async(req,res) => {
    const tasks = await Task.find({}).populate("createdBy").populate("dog").populate("assignTo")

    return res.status(200).json({
        success:true,
        tasks
    })
})

module.exports = {
    createTask,
    deleteTask,
    getTasks
}