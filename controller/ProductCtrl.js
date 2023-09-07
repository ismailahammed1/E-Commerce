const { query } = require("express");
const User = require('../models/UserModels');
const Product = require("../models/ProductModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const { json } = require("body-parser");
const mongoose = require('mongoose');

const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const product = await Product.create(req.body); // Use 'Product' instead of 'product'
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllProduct = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // Construct the initial query
    let query = Product.find(JSON.parse(queryStr));

    // Sorting
    console.log("req.query.sort:", req.query.sort);
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" "); // Separate by space
      console.log("sortBy:", sortBy); // Debugging
      query = query.sort(sortBy);
      
    } else {
      query = query.sort("-createdAt");
    }
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" "); // Separate by space
      query = query.select(fields);
    } else {
      query = query.select("-__v");

    }
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This Page does not exist");
    }

    const products = await query.skip(skip).limit(limit);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error(error);
  }
});

const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("Fetching product with ID:", id);
  try {
    const findProduct = await Product.findById(id);
    console.log("Product found:", findProduct);
    res.json(findProduct);
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error(error);
  }
});
const updateOneProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json(updateProduct);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteOneProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const deleteProduct = await Product.findByIdAndDelete(id, req.body, {
      new: true,
    });

    res.json(deleteProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const addToWishList = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user; 
    // Access the prodId from the request body
    const { prodId } = req.body;
    const user = await User.findById(_id); // Make sure to use the correct model name 'User'
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const alreadyAdded = user.wishlist.includes(prodId); // Check if prodId is already in the wishlist

    if (alreadyAdded) {
      // If prodId is already in the wishlist, remove it
      user.wishlist = user.wishlist.filter(id => id.toString() !== prodId);
    } else {
      // If prodId is not in the wishlist, add it
      user.wishlist.push(prodId);
    }

    // Save the updated user
    await user.save();

    // Return the updated wishlist
    res.json(user);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = {
  createProduct,
  getAllProduct,
  getaProduct,
  updateOneProduct,
  deleteOneProduct,
  addToWishList,
};
