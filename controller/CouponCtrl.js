const Coupon= require("../models/CouponModle")
const validateMongoDbId = require("../utils/validateMongoDbId");
const asyncHandler=require("express-async-handler");

const createCoupon = asyncHandler(async (req, res) => {
    try {
      // createCoupon
      const newCoupon = await Coupon.create(req.body);
      res.status(201).json(newCoupon);
    } catch (error) {
      throw new Error(error);
    }
  });
const getALLCoupon = asyncHandler(async (req, res) => {
    try {
      const findAllCoupon = await Coupon.find();
      res.status(201).json(findAllCoupon);
    } catch (error) {
      throw new Error(error);
    }
  });
const getACoupon = asyncHandler(async (req, res) => {
    try {
      const {id}=req.params
      const findACoupon = await Coupon.findById(id);
      res.status(201).json(findACoupon);
    } catch (error) {
      throw new Error(error);
    }
  });
const updateCoupon = asyncHandler(async (req, res) => {
    try {
      const {id}=req.params
      const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, {new:true});
      res.status(201).json(updateCoupon);
    } catch (error) {
      throw new Error(error);
    }
  });
const deleteCoupon = asyncHandler(async (req, res) => {
    try {
      const {id}=req.params
      const deleteCoupon = await Coupon.findByIdAndDelete(id);
      res.status(201).json(deleteCoupon);
    } catch (error) {
      throw new Error(error);
    }
  });
  

module.exports={createCoupon,getALLCoupon,getACoupon,updateCoupon,deleteCoupon}