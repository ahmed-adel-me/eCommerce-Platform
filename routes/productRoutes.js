const { Router } = require("express");
const {
  getProducts,
  createProduct,
} = require("../controllers/productController");
const { protect, restrectTo } = require("../controllers/authController");

const router = Router();

router
  .route("/")
  .get(protect, restrectTo("admin"), getProducts)
  .post(createProduct);

module.exports = router;
