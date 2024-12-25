const { Router } = require("express");
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  confirmOrder,
  getOrderCountStats,
  getRevenueStats,
} = require("../controllers/orderController");
const { protect } = require("../controllers/authController");

const router = Router();
router.use(protect);
router.route("/").get(getAllOrders).post(createOrder);
router.post("/confirm-order", confirmOrder);
router.get("/my-orders", getMyOrders);
router.get("/order-count-stats", getOrderCountStats);
router.get("/revenue-stats", getRevenueStats);
module.exports = router;
