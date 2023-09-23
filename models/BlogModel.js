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
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Set the reference model if applicable
      }],
      dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Set the reference model if applicable
      }],
      
      
    image: [],
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
