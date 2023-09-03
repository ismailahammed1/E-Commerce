const Category=require('../models/BrandCategoryModel')
const asyncHandler=require('express-async-handler')
const validateMongoDbId = require("../utils/validateMongoDbId");

const createBrandCategory=asyncHandler(async(req, res)=>{
    try {
        const newCategory=await Category.create(req.body)
        res.json(newCategory);

    } catch (error) {
        throw new Error(error)
    }
})
const updateBrandCategory=asyncHandler(async(req, res)=>{
    const { id } = req.params;
    validateMongoDbId(id);
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
const deleteBrandCategory=asyncHandler(async(req, res)=>{
    const { id } = req.params;

    try {
        const deleteCategory = await Category.findByIdAndDelete(id);
        console.log(deleteCategory);
        if (!deleteCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }
        
        res.json(deleteCategory);
    }  catch (error) {
        throw new Error(error)
    }
})

const getBrandCategory=asyncHandler(async(req, res)=>{
    const {id}=req.params
    validateMongoDbId(id);
    try {
        const getCategory=await Category.findById(id)
        res.json(getCategory);

    } catch (error) {
        throw new Error(error)
    }
})
const getAllBrandCategory = asyncHandler(async (req, res) => {
    try {
        const allCategories = await Category.find();
        res.json(allCategories);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    createBrandCategory,
    updateBrandCategory,
    deleteBrandCategory,
    getBrandCategory,
    getAllBrandCategory,
};