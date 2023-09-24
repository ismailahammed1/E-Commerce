const fs = require("fs");
const asyncHandler = require("express-async-handler");
const {
  cloudinaryUploading,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");
const Blog = require("../models/BlogModel");
const validateMongoDbId = require("../utils/validateMongoDbId");

const uploadBlogImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Validate the MongoDB ID
  try {
    validateMongoDbId(id);
  } catch (validationError) {
    return res.status(400).json({ error: "Invalid MongoDB ID", details: validationError.message });
  }

  try {
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const path = file.path;
      const newpath = await cloudinaryUploading(path);
      console.log('Cloudinary upload response:', newpath); // Log the Cloudinary response
      urls.push(newpath.url); // Push the secure URL to the array
      fs.unlinkSync(path);
    }

    // Update the MongoDB model with the new URLs by assigning the entire array
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      {
        new: true,
      }
    );
    res.json(updatedBlog); // Respond with the updated Blog object
  } catch (error) {
    console.error("Error uploading images:", error); // Log the specific error
    res.status(500).json({ error: "An error occurred while uploading images", details: error.message });
  }
});

const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate the MongoDB ID
  try {
    validateMongoDbId(id);
  } catch (validationError) {
    return res.status(400).json({ error: "Invalid MongoDB ID", details: validationError.message });
  }

  try {
    const deleted = await cloudinaryDeleteImg(id);
    
    if (!deleted) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.json({ image: deleted }); // Send the URL of the deleted image as a JSON response
  } catch (error) {
    console.error("Error deleting image:", error); // Log the specific error
    res.status(500).json({ error: "An error occurred while deleting the image", details: error.message });
  }
});

module.exports = { uploadBlogImages, deleteImages };
