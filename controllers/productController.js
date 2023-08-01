const Product = require("../models/Product");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getProducts = catchAsync(async (req, res, next) => {});

exports.createProduct = catchAsync(async (req, res, next) => {
    console.log(req.body);
  const { name,price,brand } = req.body;
  const newProduct = await Product.create({});

  res.status(201).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});
