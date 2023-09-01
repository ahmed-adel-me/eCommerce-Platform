const { default: mongoose } = require("mongoose");
const Category = require("../models/Category");
const Product = require("../models/Product");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const haveSameProperties = require("../utils/haveSameProperties");

// exports.getProducts = catchAsync(async (req, res, next) => {
//   const products = await Product.find()

//   res.status(200).json({
//     status: "success",
//     results: products.length,
//     data: {
//       products,
//     },
//   });
// });
exports.getProducts = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  // const { search } = req.query;

  let aggregationPipeline = [
    // Add wished field using $lookup and $in
    {
      $lookup: {
        from: "users", // Replace with the actual name of the users collection
        let: { product_id: "$_id" },
        pipeline: [
          { $match: { _id: userId } },
          { $project: { _id: 0, wishList: 1 } },
          { $unwind: "$wishList" },
          { $match: { $expr: { $eq: ["$$product_id", "$wishList"] } } },
        ],
        as: "wishedProducts",
      },
    },
    {
      $addFields: {
        wished: { $gt: [{ $size: "$wishedProducts" }, 0] },
      },
    },
    // Project only required fields
    {
      $project: {
        _id: 0,
        id: "$_id",
        name: 1,
        brand: 1,
        price: 1,
        description: 1,
        images: 1,
        createdAt: 1,
        category: 1,
        creator: 1,
        featured: 1,
        wished: 1,
      },
    },
  ];

  // Conditionally add the $match stage for search if a search query is provided
  // if (search) {
  //   const searchRegex = new RegExp(search, "i");
  //   aggregationPipeline.push({
  //     $match: {
  //       $or: [
  //         { name: { $regex: searchRegex } }, // Search in product names
  //         { description: { $regex: searchRegex } }, // Search in descriptions
  //       ],
  //     },
  //   });
  // }

  const productsWithWishedStatus = await Product.aggregate(aggregationPipeline);

  res.status(200).json({
    status: "success",
    results: productsWithWishedStatus.length,
    data: {
      products: productsWithWishedStatus,
    },
  });
});

exports.getProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.productId).populate(
    "reviews"
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
  let featuredProduct = await Product.findOne({ featured: true });
  if (!featuredProduct) featuredProduct = await Product.findOne();

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
        localField: "category._id",
        foreignField: "category.categoryRef",
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
    {
      $sort: { category: 1 }, // Sort categories in ascending order by name
    },
  ]);

  res.status(200).json({
    status: "success",
    data: categorizedProducts,
  });
});

// exports.getCategoryWithProducts = catchAsync(async (req, res, next) => {
//   const categoryId = req.params.categoryId;
//   const filterParams = req.query;
//   const category = await Category.findById(categoryId);

//   const products = await Product.find({ "category.categoryRef": categoryId });
//   const categorizedProducts = products.filter((prod) => {
//     // console.log(prod.category.properties);
//     return haveSameProperties(prod.category.properties, filterParams);
//   });

//   console.log(categorizedProducts);
//   if (categorizedProducts.length === 0) {
//     return next(
//       new AppError("No products found for the provided category ID", 404)
//     );
//   }

//   res.status(200).json({
//     status: "success",
//     data: products, // Assuming there's only one category in the result
//   });
// });

exports.getCategoryWithProducts = catchAsync(async (req, res, next) => {
  const { categoryId } = req.params;
  const category = await Category.findById(categoryId);
  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  const products = await Product.find({ "category.categoryRef": categoryId });

  // if (products.length === 0) {
  //   return next(
  //     new AppError(
  //       "No products found for the provided category and properties",
  //       404
  //     )
  //   );
  // }

  res.status(200).json({
    status: "success",
    data: {
      category,
      products,
    },
  });
});
