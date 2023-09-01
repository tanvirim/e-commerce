const { getAllProducts,createProduct, updateProductById, deleteProductById, productDetailsById } = require("../controllers/productController")
const { isAuthenticatedUser , authorizeRoles } = require("../middleware/auth")

const router = require("express").Router()

router.route("/products").get( getAllProducts)
router.route("/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct)
router.route("/product/:id")
.get(isAuthenticatedUser,productDetailsById)
.put(isAuthenticatedUser,authorizeRoles("admin"),updateProductById)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProductById)

module.exports = router