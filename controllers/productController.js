const Product = require("../models/Product");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find().populate("reviews", "-__v");

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});
exports.getProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.productId).populate(
    "reviews",
    "-__v"
  );
  if (!product) throw new AppError("No doc found with that ID!", 404);

  res.status(200).json({
    status: "success",
    data: { product },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const { name, price, brand } = req.body;
  const newProduct = await Product.create({
    name,
    price,
    brand,
    creator: req.user.id,
  });

  res.status(201).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

exports.getFeaturedProduct = catchAsync(async (req, res, next) => {
  const featuredProduct = await Product.findOne({ featured: true });
  if (!featuredProduct) throw new AppError("There is no featured product", 404);

  res.status(200).json({
    status: "success",
    data: {
      featuredProduct,
    },
  });
});

exports.setFeaturedProduct = catchAsync(async (req, res, next) => {
  await Product.findOneAndUpdate({ featured: true }, { featured: false });
  const productId = req.params.productId || req.body.productId;
  if (!productId) throw new AppError("productId is undefined", 400);
  const featuredProduct = await Product.findByIdAndUpdate(productId, {
    featured: true,
  });
  if (!featuredProduct)
    throw new AppError("Threre is no product with that id", 404);
  res.status(201).json({
    status: "success",
    data: {
      featuredProduct,
    },
  });
});
