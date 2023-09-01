const express= require('express');
const { createCategory, updateProductCategory, deleteProductCategory } = require('../controller/CagetgoryCtrl'); // Correct the filename
const { authMiddleware, isAdmin } = require('../middlewares/autMiddlewares');

const router=express.Router();

router.post('/',authMiddleware,isAdmin, createCategory)
router.put('/:id',authMiddleware,isAdmin, updateProductCategory)
router.delete('/:id',authMiddleware,isAdmin, deleteProductCategory)

module.exports=router;