const express = require('express');
const { isAdmin, authMiddleware } = require('../middlewares/autMiddlewares');
const { blogImgResize, productImgResize, uploadPhoto } = require('../middlewares/uploadImage');




const router= express.Router();

router.put('/upload/:id',authMiddleware,isAdmin,uploadPhoto.array('images',10),productImgResize, blogImgResize );

module.exports = router;