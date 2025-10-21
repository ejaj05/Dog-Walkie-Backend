const express = require("express");
const { isAuth } = require("../middleware/auth");
const { createTask, deleteTask, getTasks } = require("../controllers/task");

const taskRouter = express.Router();

taskRouter.post("/create-task",createTask)
taskRouter.delete("/delete-task/:id",isAuth,deleteTask)
taskRouter.get("/get-tasks",getTasks)

module.exports = {
    taskRouter
}