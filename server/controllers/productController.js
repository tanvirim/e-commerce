const Product = require("../model/productModel");
const ApiFeatures = require("../utils/apiFeatures");

//Admin routes..

//add product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "product creation failed",
      error,
    });
  }
};

//get all product
exports.getAllProducts = async (req, res) => {
  try {

    const resultPerPage = 5
    const productCount = await Product.countDocuments()
    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage)

    const products = await apiFeature.query
    res.status(201).json({
      success: true,
      productCount,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "product finding failed",
      error,
    });
  }
};

//get product details
exports.productDetailsById = async(req,res)=>{
    try {

     
        let product = await Product.findById(req.params.id)

        if(!product){
           return res.status(500).json({
                sucess: false ,
                message: "product not found",
                
              });
        }
       res.status(200).json({
        success:true,
        product
    })
        
    } catch (error) {
        res.status(500).json({
            message: "product finding failed",
            errorMsg: error.message,
          });
        
    }

    
}


//update product
exports.updateProductById =async (req,res)=> {

    try {

     
        let product = await Product.findById(req.params.id)

        if(!product){
           return res.status(500).json({
                sucess: false ,
                message: "product not found",
                
              });
        }

       product = await Product.findByIdAndUpdate(req.params.id , req.body, { new: true, runValidators: true })

       res.status(200).json({
        success:true,
        product
    })
        
    } catch (error) {
        res.status(500).json({
            message: "product updating failed",
            errorMsg: error.message,
          });
        
    }
}

//detele product

exports.deleteProductById =async (req,res)=> {

    try {
        await Product.findByIdAndRemove(req.params.id)
       res.status(200).json({
        success:true,
        message: "product deleted successfully"
    })
        
    } catch (error) {
        res.status(500).json({
            message: "product deleting failed",
            errorMsg: error.message,
          });
        
    }
}
