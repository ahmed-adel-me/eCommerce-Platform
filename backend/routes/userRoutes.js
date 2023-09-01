const { Router } = require("express");
const {
  signup,
  login,
  protect,
  restrectTo,
  createAdminUser,
  getUsers,
} = require("../controllers/authController");
const { getUserProfile } = require("../controllers/userController");

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/my-profile", protect, getUserProfile);
router.use(protect, restrectTo("admin"));
router.get("/admin/users", getUsers);
router.post("/admin/signup", createAdminUser);

module.exports = router;
