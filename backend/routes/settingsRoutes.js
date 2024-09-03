const {
  getOrCreateShippingPrice,
  updateShippingPrice,
} = require("../controllers/settingsController");
const { Router } = require("express");
const { protect } = require("../controllers/authController");
const router = Router();
router.use(protect);
router
  .route("/shipping-price")
  .get(getOrCreateShippingPrice)
  .put(updateShippingPrice);

module.exports = router;
