const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name of reviewer is required"],
  },
  rating: {
    type: Number,
    required: [true, "Rating of reviewer is required"],
  },
  comment: {
    type: String,
    required: [true, "comment of reviewer is required"],
  },
});

const imageSchema = new mongoose.Schema({
  public_id: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter the product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "please enter the description"],
  },
  price: {
    type: Number,
    required: [true, "please enter product price"],
    
  },
  category: {
    type: String,
    required: [true, "please enter product category"],
  },
  stock: {
    type: Number,
    required: [true, "please enter product stock"],
    max: [9999, "stock can not exceed 4 characters"],
    default: 1,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [reviewSchema],
  images: [imageSchema],
  user:{
    type: mongoose.Schema.ObjectId,
    ref:"User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
