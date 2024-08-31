const catchAsync = require("../utils/catchAsync");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const Product = require("../models/Product");
const Order = require("../models/Order");

// Function to map products to Stripe format
const mapProductsToStripeFormat = async (products, productsData) => {
  return productsData.map((el) => {
    // Find the corresponding product in the original `products` array
    const originalProduct = products.find(
      (product) => product.productId === el._id.toString()
    );

    if (!originalProduct) {
      throw new Error(`Product not found for ID: ${el._id}`);
    }

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: el.name,
        },
        unit_amount: el.price * 100,
      },
      quantity: originalProduct.quantity, // Add the quantity directly from the original data
    };
  });
};

exports.createOrder = catchAsync(async (req, res, next) => {
  const { products, orderInfo } = req.body;
  const productIds = products.map((product) => product.productId);
  const productsData = await Promise.all(
    productIds.map((id) => Product.findById(id))
  );
  const lineItems = await mapProductsToStripeFormat(products, productsData);

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.CLIENT_DOMAIN}/order?success=true`,
    cancel_url: `${process.env.CLIENT_DOMAIN}/order?canceled=true`,
  });
  await Order.create({
    ...orderInfo,
    recipient: req.user.id,
    products: productsData.map((prod) => ({
      quantity: prod.quantity,
      product: prod?.name,
    })),
  });
  res.status(200).json({
    url: session.url,
  });
});

exports.getMyOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ recipient: req.user.id });
  res.status(200).json({
    orders,
  });
});
