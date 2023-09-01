const Category=require('../models/ProductCategoryModel')
const asyncHandler=require('express-async-handler')
const validateMongoDbId = require("../utils/validateMongoDbId");

const createCategory=asyncHandler(async(req, res)=>{
    try {
        const newCategory=await Category.create(req.body)
        res.json(newCategory);

    } catch (error) {
        throw new Error(error)
    }
})
const updateProductCategory=asyncHandler(async(req, res)=>{
    const { id } = req.params;
    try {
        const updateCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
        if (!updateCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(updateCategory);
    }  catch (error) {
        throw new Error(error)
    }
})
const deleteProductCategory=asyncHandler(async(req, res)=>{
    const { id } = req.params;
    try {
        const deleteCategory = await Category.findByIdAndDelete(id);
        if (!deleteCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(deleteCategory);
    }  catch (error) {
        throw new Error(error)
    }
})

const getCategory=asyncHandler(async(req, res)=>{
    const {id}=req.params
    try {
        const getCategory=await Category.findById(id)
        res.json(getCategory);

    } catch (error) {
        throw new Error(error)
    }
})
const getAllCategory = asyncHandler(async (req, res) => {
    try {
        const allCategories = await Category.find();
        res.json(allCategories);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    createCategory,
    updateProductCategory,
    deleteProductCategory,
    getCategory,
    getAllCategory,
};