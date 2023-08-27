const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    numViews: {
      type: Number,
      default: 0,
    },
    isLiked: {
      type: Number,
      default: 0,
    },
    isDisliked: {
      type: Number,
      default: 0,
    },
    like: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Set the reference model if applicable
    },
    dislike: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Set the reference model if applicable
    },
    image: {
      type: mongoose.Schema.Types.String, // Change the type to String
      default: 'https://www.pexels.com/photo/black-smartphone-surrounded-with-plants-3707744/',
    },
    author: {
      type: String,
      default: 'Admin',
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model('Blog', blogSchema);
