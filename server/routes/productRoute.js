const { getAllProducts,createProduct, updateProductById, deleteProductById, productDetailsById } = require("../controllers/productController")

const router = require("express").Router()

router.route("/products").get(getAllProducts)
router.route("/product/new").post(createProduct)
router.route("/product/:id").put(updateProductById).delete(deleteProductById).get(productDetailsById)

module.exports = router