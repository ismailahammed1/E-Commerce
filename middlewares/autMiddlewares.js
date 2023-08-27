const User = require('../models/UserModels');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// Middleware function for authenticating the user using JWT
const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
    // Check if the authorization header starts with "Bearer"
  if (req?.headers?.authorization?.startsWith('Bearer')) {
        // Extract the token from the authorization header
    token = req.headers.authorization.split(' ')[1];
    try {
      if (token) {
         // Verify the JWT token using the provided secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      

       // Find the user in the database based on the decoded token
        const user = await User.findById(decoded?.id);
       // If user not found, throw an error

   if (!user) {

  throw new Error('User not found');  }
      // Attach the user object to the request for further use in other routes
      req.user = user;
        next(); // Call the next middleware or route handler
      }
    } catch (error) {
      throw new Error('Not authorized. Token expired or invalid. Please login again.');
    }
  } else {    // If the authorization header is missing or does not start with "Bearer", throw an error

    throw new Error('No token attached to the header.');
  }
});
// Middleware function to check if the authenticated user has admin privileges

const isAdmin = asyncHandler(async (req, res, next) => {
  const {email}=req.user;
  
    const adminUser= await User.find({email});
    
    if (req.user && req.user.isAdmin === 'true') {
     
      throw new Error('you are not an admin')
    }else{
      next()
    }
});

module.exports = { authMiddleware, isAdmin };
