const express=require("express")
const { authMiddleware, isAdmin } = require('../middlewares/autMiddlewares');
const { createCoupon } = require("../controller/CouponCtrl");


const router=express.Router();

router.post('/',authMiddleware,isAdmin,createCoupon)

module.exports=router