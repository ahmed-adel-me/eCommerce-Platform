const { Router } = require("express");
const {
  getProducts,
  createProduct,
} = require("../controllers/productController");

const router = Router();

router.route("/").get(getProducts).post(createProduct);

module.exports = router;
