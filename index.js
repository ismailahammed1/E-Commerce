// Import required dependencies and modules
const express = require('express');
const morgan = require('morgan'); // Middleware for logging HTTP requests
const cors = require('cors'); // Middleware for enabling Cross-Origin Resource Sharing (CORS)
const dotenv = require('dotenv').config(); // Load environment variables from a .env file
const app = express(); // Create an Express.js application
const PORT = process.env.PORT || 4000; // Define the port for the server to listen on
const authRouter = require('./routes/AuthRoutes'); // Import authentication routes
const productRouter = require('./routes/ProductRoutes'); // Import product-related routes
const blogRouter = require('./routes/BlogRoutes'); // Import blog-related routes
const ProductCategoryRoutes = require('./routes/ProductCategoryRoutes'); // Import product category routes
const BlogCategoryRoute = require('./routes/BlogCategoryRoutes'); // Import blog category routes
const BrandRoutes = require('./routes/BrandRoutes'); // Import brand routes
const CouponRoutes = require('./routes/CouponRoute'); // Import coupon routes
const bodyParser = require('body-parser'); // Middleware for parsing JSON requests
const dbConnect = require('./config/dbConnect'); // Function to connect to the database
const { errorHandler, notFound } = require('./middlewares/errorHandler'); // Custom error handling middleware
const cookieParser = require('cookie-parser'); // Middleware for parsing cookies

// Connect to the database
dbConnect();

// Configure middleware
app.use(morgan('dev')); // Enable request logging in the console
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded requests
app.use(cookieParser()); // Parse cookies

// Define routes for different parts of the API
app.use("/api/user", authRouter); // Authentication routes
app.use("/api/product", productRouter); // Product-related routes
app.use("/api/blog", blogRouter); // Blog-related routes
app.use("/api/category", ProductCategoryRoutes); // Product category routes
app.use("/api/blogcategory", BlogCategoryRoute); // Blog category routes
app.use("/api/brandcategory", BrandRoutes); // Brand routes
app.use("/api/coupon", CouponRoutes); // Coupon routes

// Custom error handling middleware
app.use(notFound); // Handle 404 Not Found errors
app.use(errorHandler); // Handle other errors

// Start the Express.js server and listen on the specified port
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
