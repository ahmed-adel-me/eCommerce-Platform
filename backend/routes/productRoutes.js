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
const {
  addProductToWishlist,
  getWishlist,
} = require("../controllers/wishlistController");

const router = Router({ mergeParams: true });
router.use(protect);
router.get("/categorized", getProductsByCategory);
router.get("categorized/:categoryId", getCategoryWithProducts);
router.get("/wishlist", getWishlist);
router.route("/").get(getProducts).post(restrectTo("admin"), createProduct);

router.route("/featured").get(getFeaturedProduct).post(setFeaturedProduct);
router.use("/:productId/reviews", reviewRouter);
router.post("/:productId/wishlist", addProductToWishlist);
router.route("/:productId").get(getProductById);
module.exports = router;
