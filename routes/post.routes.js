const express = require("express")
const { auth } = require("../middleware/auth")
const { PostModel } = require("../model/post.model")
const { UserModel } = require("../model/user.model")

const postRoute = express.Router()

postRoute.get("/", async(req, res)=>{
    try {
        const post = await PostModel.find()
        res.send({"msg":post})
    } catch (error) {
        res.json({err:error})
    }
})

postRoute.post("/create",async(req, res)=>{
    try {
        const post = new PostModel(req.body)
        await post.save()
        res.send("Posts Created")
    } catch (error) {
        res.json({err:error.message})
    }
    
} )

postRoute.patch("/update:id", async(req, res)=>{
    const {id} = req.query
    try {
        const post = await PostModel.findByIdAndUpdate({_id:id}, req.body)
        res.send({"msg":"Post has been Updated"})
    } catch (error) {
        res.json({err:error})
    }
})

postRoute.delete("/delete:id", async(req, res)=>{
    const {id} = req.query
    try {
        const post = await PostModel.findByIdAndDelete({_id:id})
        res.send({"msg":"Post has been Deleted"})
    } catch (error) {
        res.json({err:error})
    }
})

module.exports = {
    postRoute
}