const fs = require("fs");
const asyncHandler = require("express-async-handler");
const {
  cloudinaryUploading,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");
const Product = require("../models/ProductModel");
const validateMongoDbId = require("../utils/validateMongoDbId");

const uploadBlogImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const uploader = (path) => cloudinaryUploading(path, 'images');
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      console.log(newpath);
      urls.push(newpath);
      fs.unlinkSync(path)
    }

    // Use await to wait for the Product.findByIdAndUpdate query to complete
    const findproduct = await Product.findByIdAndUpdate(
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

    res.json(findproduct); // Respond with the updated product object
  } catch (error) {
    console.error("Error uploading images:", error); // Log the specific error
    res.status(500).json({ error: "An error occurred while uploading images", details: error.message });
  }
});





const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await cloudinaryDeleteImg(id);
    res.json({ image: deleted }); // Send the URL of the deleted image as a JSON response
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { uploadBlogImages, deleteImages };
