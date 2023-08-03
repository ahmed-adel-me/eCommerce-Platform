const { Router } = require("express");
const {
  getCategories,
  createCategory,
} = require("../controllers/categoryController");

const router = Router();

router.route("/").get(getCategories).post(createCategory);

module.exports = router;
