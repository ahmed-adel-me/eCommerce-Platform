const { Router } = require("express");
const {
  getCategories,
  createCategory,
  deleteCategory,
  getCategoryById,
  updateCategory,
} = require("../controllers/categoryController");

const router = Router();

router.route("/").get(getCategories).post(createCategory);
router.route("/:categoryId").get(getCategoryById).patch(updateCategory).delete(deleteCategory);
module.exports = router;
