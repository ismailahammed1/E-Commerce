const express = require('express');
const { createProduct, getaProduct,getAllProduct, updateOneProduct, deleteOneProduct} = require('../controller/ProductCtrl');
const { isAdmin, authMiddleware } = require('../middlewares/autMiddlewares');




const router= express.Router();

router.post('/',authMiddleware,isAdmin,createProduct);
router.get('/:id', getaProduct);
router.put('/:id', authMiddleware,isAdmin,updateOneProduct);
router.delete('/:id',authMiddleware,isAdmin,deleteOneProduct);
router.get('/', getAllProduct);


  
  module.exports = router;