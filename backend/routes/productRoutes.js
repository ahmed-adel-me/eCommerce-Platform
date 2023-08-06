const { Router } = require("express");
const {
  getProducts,
  createProduct,
  getFeaturedProduct,
  setFeaturedProduct,
  getProductById,
  getProductsByCategory,
  getCategoryWithProducts,
} = require("../controllers/productController");
const { protect, restrectTo } = require("../controllers/authController");
const reviewRouter = require("./reviewRoutes");

const router = Router();
router.get("/categorized", getProductsByCategory);
router.get("categorized/:categoryId", getCategoryWithProducts);
router
  .route("/")
  .get(getProducts)
  .post(protect, restrectTo("admin"), createProduct);

router.route("/featured").get(getFeaturedProduct).post(setFeaturedProduct);
router.route("/:productId").get(getProductById);
router.use("/:productId/reviews", reviewRouter);

module.exports = router;
