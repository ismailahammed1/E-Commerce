const express = require('express');
const { createProduct, getaProduct,getAllProduct, updateOneProduct, deleteOneProduct, addToWishList, rateProduct, uploadImages} = require('../controller/ProductCtrl');
const { isAdmin, authMiddleware } = require('../middlewares/autMiddlewares');
const { uploadPhoto, productImgResize } = require('../middlewares/uploadImage');



const router= express.Router();

router.post('/',authMiddleware,isAdmin,createProduct);
router.put(
    '/upload/:id',
    authMiddleware, 
    isAdmin,uploadPhoto.array('images', 10), productImgResize,uploadImages
  );
router.get('/:id', getaProduct);
router.put('/:id', authMiddleware,isAdmin,updateOneProduct);
router.put('/wishlist/:id', authMiddleware, addToWishList);
router.put('/rating/:id', authMiddleware, rateProduct);
router.delete('/:id',authMiddleware,isAdmin,deleteOneProduct);
router.get('/', getAllProduct);


module.exports = router;