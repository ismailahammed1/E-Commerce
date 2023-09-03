const express= require('express');
const {getAllBrandCategory, getBrandCategory, deleteBrandCategory, updateBrandCategory, createBrandCategory } = require('../controller/BrandCagetoryCtrl'); // Correct the filename
const { authMiddleware, isAdmin } = require('../middlewares/autMiddlewares');

const router=express.Router();

router.post('/',authMiddleware,isAdmin, createBrandCategory)
router.put('/:id',authMiddleware,isAdmin, updateBrandCategory)
router.delete('/:id',authMiddleware,isAdmin, deleteBrandCategory)
router.get('/:id',getBrandCategory)
router.get('/',getAllBrandCategory)

module.exports=router;