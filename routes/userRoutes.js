const { Router } = require("express");
const {
  signup,
  login,
  protect,
  restrectTo,
  createAdminUser,
  getUsers,
} = require("../controllers/authController");

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

router.use(protect, restrectTo("admin"));
router.get("/admin/users", getUsers);
router.post("/admin/signup", createAdminUser);

module.exports = router;
