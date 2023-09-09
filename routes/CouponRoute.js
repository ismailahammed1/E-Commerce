const express=require("express")
const { authMiddleware, isAdmin } = require('../middlewares/autMiddlewares');
const { createCoupon, getALLCoupon } = require("../controller/CouponCtrl");


const router=express.Router();

router.post('/',authMiddleware,isAdmin,createCoupon) 
router.get('/',authMiddleware,isAdmin,getALLCoupon) 

module.exports=router