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
      user: req.user,
    },
  });
});

exports.deleteWishlistProduct = catchAsync(async (req, res, next) => {});
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
