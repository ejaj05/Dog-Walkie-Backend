const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { coonectToDatabse } = require("./config/database");
const { errorMiddleware } = require("./middleware/error");
const { authRouter } = require("./routes/auth");
const { cloudinaryConnect } = require("./config/cloudinary");
const cookieParser = require("cookie-parser");
const { profileRoute } = require("./routes/profile");
const { taskRouter } = require("./routes/task");

const rateLimit = require("express-rate-limit")
const http = require("http")
const helmet = require("helmet");

const PORT = process.env.PORT


const app = express();

app.use(express.json());

app.use(cookieParser())


app.get("/",(req,res)=>{
    console.log("Hello World")
    res.send("Hello world")
})

app.use("/api/v1/user",authRouter)
app.use("/api/v1/profile",profileRoute)
app.use("/api/v1/task",taskRouter)

app.use(errorMiddleware)


app.listen(PORT,() =>{
    console.log("Server is running on PORT:",PORT)
})
coonectToDatabse();
cloudinaryConnect();