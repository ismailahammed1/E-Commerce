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
  

module.exports={createCoupon,}