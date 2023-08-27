// routes/blogRoutes.js
const express = require("express");
const { createBlog, updateBlog, getBlog, getAllBlog, deleteBlog } = require("../controller/blogCtrl");
const { authMiddleware, isAdmin } = require('../middlewares/autMiddlewares');

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createBlog);
router.put('/:id', authMiddleware, isAdmin, updateBlog);
router.get('/:id', getBlog);
router.get('/', getAllBlog); 
router.delete('/:id', authMiddleware, isAdmin, deleteBlog); 

module.exports = router;
