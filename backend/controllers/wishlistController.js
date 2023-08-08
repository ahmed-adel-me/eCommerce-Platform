const { default: mongoose } = require("mongoose");
const Product = require("../models/Product");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.addProductToWishlist = catchAsync(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId);
  if (req.user.wishList.includes(productId))
    throw new AppError("product is already in wishlist!");
  req.user.wishList.push(product);
  await req.user.save({ validateBeforeSave: false });

  res.status(201).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.deleteWishlistProduct = catchAsync(async (req, res, next) => {
  const { productId } = req.params;

  req.user.wishList = req.user.wishList.filter(
    (product) => !product._id.equals(productId)
  );

  await req.user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
  });
});

exports.getWishlist = catchAsync(async (req, res, next) => {
  const { wishList } = await User.findById(req.user._id).populate("wishList");
  const updatedWishList = wishList.map((product) => ({
    ...product.toObject(),
    wished: true,
  }));

  res.status(200).json({
    status: "success",
    data: {
      wishList: updatedWishList,
    },
  });
});
