const express= require('express');
const { createCategory, updateProductCategory, deleteProductCategory, getCategory, getAllCategory } = require('../controller/CagetgoryCtrl'); // Correct the filename
const { authMiddleware, isAdmin } = require('../middlewares/autMiddlewares');

const router=express.Router();

router.post('/',authMiddleware,isAdmin, createCategory)
router.put('/:id',authMiddleware,isAdmin, updateProductCategory)
router.delete('/:id',authMiddleware,isAdmin, deleteProductCategory)
router.get('/:id',getCategory)
router.get('/',getAllCategory)

module.exports=router;