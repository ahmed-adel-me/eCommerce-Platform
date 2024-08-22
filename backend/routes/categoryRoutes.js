const { Router } = require("express");
const {
  getCategories,
  createCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = Router();

router.route("/").get(getCategories).post(createCategory);
router.route("/:categoryId").delete(deleteCategory);
module.exports = router;
