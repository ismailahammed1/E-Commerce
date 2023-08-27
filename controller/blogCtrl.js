const User = require('../models/UserModels')
const Blog=require("../models/BlogModel");
const asyncHandler= require('express-async-handler')
const validateMongoDbId = require("../utils/validateMongoDbId");

const createBlog= asyncHandler(async(req, res)=>{
    try {
        const newBlog = await Blog.create(req.body);
        res.json({
            newBlog
        })
    } catch (error) {
        throw new Error(error)
    }
});


module.exports={createBlog}