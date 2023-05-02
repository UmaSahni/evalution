const jwt = require("jsonwebtoken")

const auth = (req, res, next) =>{
const token = req.headers.authorization
    if(token){
        try {
            var decoded = jwt.verify(token.split(" ")[1], 'shhhhh');
            console.log(decoded)
            if(decoded){
                next()
            }
            else{
                res.send({"msg":"please login!"})
            }
        } catch (error) {
            res.send({"msg":error.message})
        }
    }
    else{
        res.json({msg:"Please Login!!"})
    }
}

module.exports ={
    auth
}