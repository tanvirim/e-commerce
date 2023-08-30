const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../model/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler"); 


//Admin routes..

//add product
exports.createProduct = catchAsyncError(
  async (req, res) => {

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
}
)

//get all product
exports.getAllProducts = catchAsyncError(
  async (req, res) => {
 
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);

    const products = await apiFeature.query;
    res.status(201).json({
      success: true,
      productCount,
      products,
    })
}
)

//get product details
exports.productDetailsById = catchAsyncError(
  async (req, res, next) => {
    let product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHandler("product not found", 404));
    }
    res.status(200).json({
      success: true,
      product,
    });
  }
)

//update product
exports.updateProductById = catchAsyncError(
  async (req, res,next) => {
    let product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHandler("product not found", 404));
    }
  
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    res.status(200).json({
      success: true,
      product,
    });
  }
)

//detele product
exports.deleteProductById = catchAsyncError(
  async (req, res,next) => {
    const product = await Product.findByIdAndRemove(req.params.id);
  
    if (!product) {
      return next(new ErrorHandler("product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      message: "product deleted successfully",
    });
  }
  
)