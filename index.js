const express = require ("express")
const { connection } = require("./db")
const { userRoute } = require("./routes/user.routes")
const jwt = require('jsonwebtoken');
const { auth } = require("./middleware/auth");
const { postRoute } = require("./routes/post.routes");

require('dotenv').config()


const app = express()
app.use(express.json())



app.use("/users", userRoute)
app.use(auth)
// protected routes ---> Token

app.use("/posts", postRoute)

app.listen(process.env.port, async()=>{
    try {
      await connection()
      console.log("Mongoose is started")
    } catch (error) {
        console.log("Error in mongoose")
    }
    console.log("Express is started")
})