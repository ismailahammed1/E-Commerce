const User = require("../models/UserModels");
const Blog = require("../models/BlogModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId");

const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json({
      newBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// updateBlog
const updateBlog = asyncHandler(async (req, res) => {
  const id = req.params.id; // Extract the id from request parameters
  validateMongoDbId(id)
  try {
    const newupdateBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({
      newupdateBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});
// get a blog
const getBlog = asyncHandler(async (req, res) => {
  const id = req.params.id; // Extract the id from request parameters
  validateMongoDbId(id)
  try {
    const blog = await Blog.findById(id)
    .populate('likes')
    .populate('dislikes')
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $inc: { numViews: 1 } },
      {
        new: true,
      }
    );
    res.json({
      blog: updatedBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

///?get all Blog
const getAllBlog = asyncHandler(async (req, res) => {
  try {
    const getAllBlog = await Blog.find();
    res.json({
      getAllBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

///?delete a Blog
const deleteBlog = asyncHandler(async (req, res) => {
  const id = req.params.id; // Extract the id parameter from req.params
  validateMongoDbId(id)
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({
      deletedBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//likes blog and dislike blog
const likeTheBlog= asyncHandler(async(req, res)=>{

    const { blogId } = req.body;
    console.log("blogId:", blogId);
    validateMongoDbId(blogId)

    const blog= await Blog.findById(blogId)
    const loginUserId=req?.user?._id;
    const isLiked =blog?.isLiked;
    const alreadyDisliked=blog?.dislikes?.find(
        (userId)=>userId?.toString()===loginUserId?.toString()
    );
    if (alreadyDisliked){
        const blog = await Blog.findByIdAndUpdate(
            blogId,{
                $pull:{dislikes:loginUserId},
                isDisliked:false,
            },
            {new:true}
        )
        res.json(blog)
    }
    if (isLiked){
        const blog = await Blog.findByIdAndUpdate(
            blogId,{
                $pull:{likes:loginUserId},
                isLiked:false,
            },
            {new:true}
        )
        res.json(blog)
    }
    else{
        const blog = await Blog.findByIdAndUpdate(
            blogId,{
                $push:{likes:loginUserId},
                isLiked:true,
            },
            {new:true}
        )
        res.json(blog)
    } 
})


//Disikes blog and dislike blog
const DislikeBlog= asyncHandler(async(req, res)=>{

  const { blogId } = req.body;
  console.log("blogId:", blogId);
  validateMongoDbId(blogId)

  const blog= await Blog.findById(blogId)
  const loginUserId=req?.user?._id;
  const isDisliked =blog?.isDisliked;
  const alreadyLiked=blog?.likes?.find(
      (userId)=>userId?.toString()===loginUserId?.toString()
  );
  if (alreadyLiked){
      const blog = await Blog.findByIdAndUpdate(
          blogId,{
              $pull:{likes:loginUserId},
              isLiked:false,
          },
          {new:true}
      )
      res.json(blog)
  }
  if (isDisliked){
      const blog = await Blog.findByIdAndUpdate(
          blogId,{
              $pull:{dislikes:loginUserId},
              isDisliked:false,
          },
          {new:true}
      )
      res.json(blog)
  }
  else{
      const blog = await Blog.findByIdAndUpdate(
          blogId,{
              $push:{dislikes:loginUserId},
              isDisliked:true,
          },
          {new:true}
      )
      res.json(blog)
  } 
})

module.exports = { createBlog, updateBlog, getBlog, getAllBlog, deleteBlog,likeTheBlog,DislikeBlog };
