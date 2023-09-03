const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../model/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler"); 


//Admin routes..

//add product
exports.createProduct = catchAsyncError(
  async (req, res) => {

    //make logged in user as the creator of the product
    //req.user is from cookies
    req.body.user = req.user.id ;


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
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    // // Deleting Images From Cloudinary
    // for (let i = 0; i < product.images.length; i++) {
    //   await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    // }
  
    await product.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  }
  
)

// Create New Review or Update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.reviewId.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});