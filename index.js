const express=require("express")
const connection=require("./configs/db")
const {userRouter}=require("./routes/user.Route")
const {blogsRouter}=require("./routes/blog.Route")

require("dotenv").config()
const cors=require("cors")
const app=express()
app.use(express.json())
const port=process.env.port|| 8080

app.use(cors())
app.get("/",(req,res)=>{
    res.send("Welcome to homepage of Blogs Backend")
})

app.use("/user",userRouter)


app.use("/blogs",blogsRouter)
app.listen(port,async()=>{
    try {
        await connection
        console.log("Connnection succesfully to db")
    } catch (error) {
      console.log(error)  
    }
    console.log("Port Running at 8080")
})