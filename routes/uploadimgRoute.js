/* const express = require('express');
const router = express.Router();

// Import middleware and controller functions
const { isAdmin, authMiddleware } = require('../middlewares/autMiddlewares');
const { uploadPhoto, productImgResize, blogImgResize } = require('../middlewares/uploadImage');
const {  uploadImages } = require('../controller/UploadImgCtrl');

// Define routes

// Upload images route
router.put(
  '/upload/:id',
  authMiddleware, // Authentication middleware
  isAdmin, // Authorization middleware (isAdmin)
  uploadPhoto.array('images', 10), // Multer middleware for file uploads
  productImgResize, // Image resizing middleware (if needed)
  blogImgResize, // Image resizing middleware (if needed)
  uploadImages // Controller function for uploading images
);

// Delete image route
/* router.delete(
  '/delete/:id',
  authMiddleware, // Authentication middleware
  isAdmin, // Authorization middleware (isAdmin)
  deleteImage // Controller function for deleting an image
); */

//module.exports = router;
