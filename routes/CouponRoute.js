const express=require("express")
const { authMiddleware, isAdmin } = require('../middlewares/autMiddlewares');
const { createCoupon, getALLCoupon, getACoupon } = require("../controller/CouponCtrl");


const router=express.Router();

router.post('/',authMiddleware,isAdmin,createCoupon) 
router.get('/',authMiddleware,isAdmin,getALLCoupon) 
router.get('/:id',authMiddleware,isAdmin,getACoupon) 

module.exports=router