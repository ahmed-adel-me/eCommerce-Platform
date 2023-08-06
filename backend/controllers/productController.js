const Category = require("../models/Category");
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
  const { name, price, brand, images, description, category } = req.body;
  const newProduct = await Product.create({
    name,
    price,
    brand,
    images,
    description,
    category,
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

// exports.getproductsByCategory = catchAsync(async (req, res, next) => {
//   const categories =await Category.find();
//   const products = await Product.find()
//   console.log(categories);
//   res.status(200).json({
//     status:"success",
//     data:{

//     }
//   })
// });
exports.getProductsByCategory = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || null;

  const categorizedProducts = await Product.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "category.name",
        foreignField: "name",
        as: "categoryDetails",
      },
    },
    {
      $unwind: "$categoryDetails",
    },
    {
      $group: {
        _id: "$categoryDetails.name",
        categoryId: { $first: "$categoryDetails._id" },
        products: {
          $push: {
            id: "$_id",
            name: "$name",
            brand: "$brand",
            price: "$price",
            description: "$description",
            images: "$images",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        categoryId: 1,
        category: "$_id",
        products: limit ? { $slice: ["$products", limit] } : "$products", // Apply the limit using $slice if limit is provided
        numberOfProducts: { $size: "$products" }, // Count the number of products
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: categorizedProducts,
  });
});

exports.getCategoryWithProducts = catchAsync(async (req, res, next) => {
  const { categoryId } = req.params;
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 if not provided

  const categorizedProducts = await Product.aggregate([
    {
      $match: { "categoryDetails._id": mongoose.Types.ObjectId(categoryId) },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category.name",
        foreignField: "name",
        as: "categoryDetails",
      },
    },
    {
      $unwind: "$categoryDetails",
    },
    {
      $group: {
        _id: "$categoryDetails.name",
        categoryId: { $first: "$categoryDetails._id" },
        products: {
          $push: {
            _id: "$_id",
            name: "$name",
            brand: "$brand",
            price: "$price",
            description: "$description",
            images: "$images",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        categoryId: 1,
        category: "$_id",
        products: { $slice: ["$products", limit] }, // Apply the limit using $slice
      },
    },
  ]);

  if (categorizedProducts.length > 0) {
    res.status(200).json({
      status: "success",
      data: categorizedProducts[0],
    });
  } else throw new AppError("Category not found", 404);
});
