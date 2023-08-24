const express = require("express");
const blogsModel = require("../model/blog.Model");
const blogsRouter = express.Router();

blogsRouter.get("/", async (req, res) => {
  const query = {};
  try {
    const blogs = await blogsModel.find(query);
    res.send({ message: "Blogs page working" });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
});

blogsRouter.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const blogPost = new blogsModel(payload);
    await blogPost.save();
    res.send("newblogs created successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

blogsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blogs= await blogsModel.findById(id);
    if (!blogs) {
      res.status(404).send({ message: "blogs Post not found" });
    } else {
      res.send({ blogs});
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Something went wrong" });
  }
});

blogsRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const blogspost= await blogsModel.findById(id);
    const userID_in_blog = blogspost.userID;
    const userID_in_req = req.body.userID;
    if (userID_in_blog !== userID_in_req) {
      res.status(401).send({ message: "You are not authorized to proceed" });
    } else {
      await blogsModel.findByIdAndUpdate(id, payload);
      res.send("Updated Blogs successfully");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Something went wrong" });
  }
});

blogsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blogs = await blogsModel.findById(id);
    const userID_in_blogs = blogs.userID;
    const userID_in_req = req.body.userID;
    if (userID_in_blogs !== userID_in_req) {
      res.status(401).send({ message: "You are not authorized to proceed" });
    } else {
      await blogsModel.findByIdAndDelete(id);
      res.send("Deleted blogs successfully");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Something went wrong" });
  }
});

//filter-/api/blogs?category=tech
blogsRouter.get("/", async (req, res) => {
    try {
      const category = req.query.category; 
      const query = category ? { category } : {};
  
      const filterData = await blogsModel.find(query);
  
      res.json(filterData);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong,try again"});
    }
  });
  
blogsRouter.get("/",async(req,res)=>{
    try {
        const search=req.query.title;

     let searchData=await doctorModel.find({title:search})
     res.json(searchData)
    } catch (error) {
      res.status(500).json({ message: "something goes wrong" });
    }
  })




module.exports = {
  blogsRouter,
};

