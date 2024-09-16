const { Router } = require("express");
const {
  signup,
  login,
  protect,
  restrectTo,
  getUsers,
  logout,
  createAdmin,
} = require("../controllers/authController");
const {
  getUserProfile,
  updateMyProfile,
} = require("../controllers/userController");

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", protect, logout);
router
  .route("/my-profile")
  .get(protect, getUserProfile)
  .patch(protect, updateMyProfile);
router.use(protect);
router.get("/admin/users", getUsers);
router.post("/admin/signup", createAdmin);


module.exports = router;
