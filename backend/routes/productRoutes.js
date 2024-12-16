const { Router } = require("express");
const {
  getProducts,
  createProduct,
  getFeaturedProduct,
  setFeaturedProduct,
  getProductById,
  getCategoryWithProducts,
  deleteProduct,
  getCategoriesWithProducts,
} = require("../controllers/productController");
const { protect } = require("../controllers/authController");
const reviewRouter = require("./reviewRoutes");
const {
  addProductToWishlist,
  getWishlist,
  deleteWishlistProduct,
} = require("../controllers/wishlistController");

const router = Router({ mergeParams: true });
router.use(protect);
router.get("/categorized", getCategoriesWithProducts);
router.get("/categorized/:categoryId", getCategoryWithProducts);
router.get("/wishlist", getWishlist);
router.route("/").get(getProducts).post(createProduct);

router.route("/:productId").delete(deleteProduct);
router.route("/featured").get(getFeaturedProduct).post(setFeaturedProduct);
router.use("/:productId/reviews", reviewRouter);
router
  .route("/:productId/wishlist")
  .post(addProductToWishlist)
  .delete(deleteWishlistProduct);
router.route("/:productId").get(getProductById);
module.exports = router;
