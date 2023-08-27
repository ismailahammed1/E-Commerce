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
  
    try {
      const blog = await Blog.findById(id);
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
        getAllBlog
      });
    } catch (error) {
      throw new Error(error);
    }
  });

module.exports = { createBlog, updateBlog,getBlog,getAllBlog };
