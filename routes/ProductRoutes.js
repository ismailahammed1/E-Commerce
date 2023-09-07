const express = require('express');
const { createProduct, getaProduct,getAllProduct, updateOneProduct, deleteOneProduct, addToWishList} = require('../controller/ProductCtrl');
const { isAdmin, authMiddleware } = require('../middlewares/autMiddlewares');




const router= express.Router();

router.post('/',authMiddleware,isAdmin,createProduct);
router.get('/:id', getaProduct);
router.put('/:id', authMiddleware,isAdmin,updateOneProduct);
router.put('/wishlist/:id', authMiddleware, addToWishList);
router.delete('/:id',authMiddleware,isAdmin,deleteOneProduct);
router.get('/', getAllProduct);


  
  module.exports = router;