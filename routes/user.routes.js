const express = require("express")
const { UserModel } = require("../model/user.model")
const userRoute = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

userRoute.post("/register", async(req, res)=>{
   const {email, password, gender, name} = req.body
    try {
        bcrypt.hash(password, 3, async function(err, hash) {
    // Store hash in your password DB.
    if(hash){
        const user = new UserModel({email,gender, name, password:hash})
        await  user.save()
        res.status(200).json({msg:"New user has been added"})
    }
    else{
        res.send({"msg":"An error occured while bcrypting"})
    }
});
    } catch (error) {
        res.status(400).json({err:error})
    }
})

userRoute.post("/login", async(req, res)=>{
    const {email, password} = req.body
  
    const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
    try {
     const user = await UserModel.findOne({email})
     
     if(user){
         bcrypt.compare(password, user.password, function(err, result) {
         if(result){
            res.json({msg:"You are Log in", token})
        }
        else{
            res.json({err:"Wrong Information"})
        }
    });  
     }
     else{
        res.json({msg:"User Not Found"})
     }
    } catch (error) {
        res.status(400).json({err:error})
    }
})

module.exports = {
    userRoute
}