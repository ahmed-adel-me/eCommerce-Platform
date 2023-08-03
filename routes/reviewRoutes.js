const { Router } = require("express");
const { protect } = require("../controllers/authController");
const {
  getAllReviews,
  createReview,
} = require("../controllers/reviewController");

const reviewRouter = Router({mergeParams:true});

reviewRouter.route("/").get(protect, getAllReviews).post(protect, createReview);

module.exports = reviewRouter;
