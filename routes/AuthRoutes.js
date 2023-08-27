const express = require('express');
const { createUser, loginUserctrl, getallUsers, getOneUser, deleteaUser, updatedUser, blockUser, unblockUser, handleRefreshToken, logout, updatedPassword, forgotPasswordToken, resetPassword } = require('../controller/userCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/autMiddlewares');


const router= express.Router();

router.post("/register",createUser);
router.post("/forgot-password-token",forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password",authMiddleware, updatedPassword);
router.post("/login",loginUserctrl);
router.get("/all-users",getallUsers);
router.get("/refesh",handleRefreshToken); 
router.get("/logout",logout); 
router.get("/:id", authMiddleware, isAdmin, getOneUser);
router.delete("/:id", deleteaUser); 
router.put("/edit-user",authMiddleware,isAdmin, updatedUser); 
router.put("/block-user/:id",authMiddleware,isAdmin, blockUser); 
router.put("/unblock-user/:id",authMiddleware, isAdmin,unblockUser); 
  
  module.exports = router;