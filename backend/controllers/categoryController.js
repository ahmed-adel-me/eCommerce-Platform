const Category = require("../models/Category");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json(categories);
});
exports.getCategoryById = catchAsync(async (req, res, next) => {
  const { categoryId } = req.params;
  const category = await Category.findById(categoryId);
  
  res.status(200).json(category);
});
exports.createCategory = catchAsync(async (req, res, next) => {
  const { name, brands, properties } = req.body;
  console.log(req.body);

  const formattedProperties = properties.map(({ name, values }) => {
    // Split the comma-separated string, trim each value, and filter out empty values
    const trimmedValues = values
      .split(",")
      .map((value) => value.trim())
      .filter((value) => value.length > 0);

    return { name, values: trimmedValues };
  });
  const formattedBrands = brands
    ?.split(",")
    .map((value) => value.trim())
    .filter((value) => value.length > 0);

  const newCategory = await Category.create({
    name,
    brands: formattedBrands,
    properties: formattedProperties,
  });

  res.status(201).json(newCategory);
});
exports.updateCategory = catchAsync(async (req, res, next) => {
  const { categoryId } = req.params;

  const category = await Category.findByIdAndUpdate(categoryId, req.body);
  if (!category) throw new AppError("this category doesn't exists", 404);

  res.status(200).json(category);
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const { categoryId } = req.params;
  const category = await Category.findByIdAndDelete(categoryId);
  if (!category) throw new AppError("this category doesn't exists", 404);

  res.status(200).json({
    status: "success",
    data: null,
  });
});
