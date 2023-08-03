const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  title: {
    type: String,
    required: [true, "Review title is missing"],
  },
  description: String,
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: [true, "Provide a rating!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  product: {
    type: Schema.ObjectId,
    ref: "Product",
    required: [true, "Review must belong to a product"],
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: [true, "Review must belong to a user"],
  },
});

const Review = model("Review", reviewSchema);
module.exports = Review;
