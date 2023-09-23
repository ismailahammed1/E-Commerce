// routes/blogRoutes.js
const express = require("express");
const { createBlog, updateBlog, getBlog, getAllBlog, deleteBlog, likeTheBlog, DislikeBlog } = require("../controller/blogCtrl");
const { authMiddleware, isAdmin } = require('../middlewares/autMiddlewares');

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createBlog);
router.put(
    '/upload/:id',
    authMiddleware, 
    isAdmin,uploadPhoto.array('images', 10), productImgResize,uploadImages
  );
router.put('/:id', authMiddleware, isAdmin, updateBlog);
router.get('/:id', getBlog);
router.get('/', getAllBlog); 
router.delete('/:id', authMiddleware, isAdmin, deleteBlog); 
router.put('/:id/likes', authMiddleware,  likeTheBlog); 
router.put('/:id/dislikes',authMiddleware,   DislikeBlog); 

module.exports = router;
