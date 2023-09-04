const { Router } = require("express");
const { createOrder, getMyOrders } = require("../controllers/orderController");
const { protect } = require("../controllers/authController");

const router = Router();
router.use(protect);
router.post("/", createOrder);
router.get("/", getMyOrders);
module.exports = router;
