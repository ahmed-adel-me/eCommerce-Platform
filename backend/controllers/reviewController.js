const Review = require("../models/Review");
const catchAsync = require("../utils/catchAsync");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ product: req.params.productId });

  res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const { title, description, rating } = req.body;
  const newReview = await Review.create({
    title,
    description,
    rating,
    user: req.user.id,
    product: req.params.productId,
  });

  res.status(201).json({
    status: "success",
    data: {
      review: newReview,
    },
  });
});
