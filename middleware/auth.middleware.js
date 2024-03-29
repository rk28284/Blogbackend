require("dotenv").config()
const jwt=require("jsonwebtoken")

const authentication=(req,res,next)=>{

    const token=req.headers.authorization

    if(token){
        const decoded=jwt.verify(token,process.env.key)
        if(decoded){
            const userID=decoded.userID
            console.log(decoded)
            req.body.userID=userID
            next()
        }
        
        else{
            res.send("Please Login first then proceed")
        }
    }
    else{
        res.send("Login first required")
    }
}
module.exports={authentication}