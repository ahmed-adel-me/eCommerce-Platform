const { Router } = require("express");
const {
  getProducts,
  createProduct,
} = require("../controllers/productController");
const { protect } = require("../controllers/authController");

const router = Router();

router.route("/").get(protect, getProducts).post(createProduct);

module.exports = router;
