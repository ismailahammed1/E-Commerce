const express=require("express")
const { authMiddleware, isAdmin } = require('../middlewares/autMiddlewares');
const { createCoupon, getALLCoupon, getACoupon,deleteCoupon ,updateCoupon} = require("../controller/CouponCtrl");


const router=express.Router();

router.post('/',authMiddleware,isAdmin,createCoupon) 
router.get('/',authMiddleware,isAdmin,getALLCoupon) 
router.get('/:id',authMiddleware,isAdmin,getACoupon)
router.put('/:id',authMiddleware,isAdmin,updateCoupon)
router.delete('/:id',authMiddleware,isAdmin,deleteCoupon)

module.exports=router