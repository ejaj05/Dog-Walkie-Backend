const mongoose = require("mongoose")


const coonectToDatabse = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected To Database")
    })
    .catch((err) => {
        console.log("Database Connection Failed:",err)
    })
}

module.exports = {
    coonectToDatabse
}