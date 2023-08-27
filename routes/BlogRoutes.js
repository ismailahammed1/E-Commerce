const express=require('express');
const { createBlog } = require('../controller/blogCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/autMiddlewares');

const router= express.Router();

router.post('/', authMiddleware,isAdmin, createBlog)

module.exports = router;