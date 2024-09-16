const catchAsync = require("../utils/catchAsync");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const Product = require("../models/Product");
const Order = require("../models/Order");
const AppError = require("../utils/AppError");
const Settings = require("../models/Settings");

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).json(orders);
});

const mapProductsToStripeFormat = async (products, productsData, shippingPrice = 0) => {
  // Convert the products array to a Map for O(1) lookups
  const productsMap = new Map(products.map(product => [product.productId, product]));

  const mappedProducts = productsData.map((el) => {
    const originalProduct = productsMap.get(el._id.toString());

    if (!originalProduct) {
      throw new Error(`Product not found for ID: ${el._id}`);
    }

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: el.name,
        },
        unit_amount: el.price * 100, // Stripe expects amounts in cents
      },
      quantity: originalProduct.quantity, // Add the quantity directly from the original data
    };
  });

  // If a shipping price is provided, add it as an additional line item
  if (shippingPrice > 0) {
    mappedProducts.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Shipping",
        },
        unit_amount: shippingPrice * 100, // Convert shipping price to cents
      },
      quantity: 1, // Shipping is usually charged as a single item
    });
  }

  return mappedProducts;
};


exports.createOrder = catchAsync(async (req, res, next) => {
  const { products, orderInfo } = req.body;
  
  // Extract product IDs from the request
  const productIds = products.map((product) => product.productId);

  // Fetch product data from the database
  const productsData = await Promise.all(
    productIds.map((id) => Product.findById(id))
  );

  if (productsData.length !== products.length) {
    return next(new AppError("One or more products could not be found", 404));
  }

  // Fetch the shipping price from settings
  const settings = await Settings.findOne();
  const shippingPrice = settings ? settings.shippingPrice : 0; // Set default shipping price to 0 if not found

  // Map products to Stripe's format, including shipping price
  const lineItems = await mapProductsToStripeFormat(products, productsData, shippingPrice);

  // Create a Stripe session with metadata
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.CLIENT_DOMAIN}/order?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_DOMAIN}/order?canceled=true`,
    metadata: {
      userId: req.user.id,
      products: JSON.stringify(products), // Stringify products
      orderInfo: JSON.stringify(orderInfo), // Stringify orderInfo
    },
  });

  // Send the Stripe session URL to the client
  res.status(200).json({
    url: session.url,
  });
});

exports.confirmOrder = catchAsync(async (req, res, next) => {
  const sessionId = req.query.session_id;

  // Check if an order with this sessionId already exists
  const existingOrder = await Order.findOne({ sessionId });
  if (existingOrder) {
    return next(new AppError("Order already confirmed for this session.", 400));
  }

  // Fetch the session data from Stripe
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status === "paid") {
    // Parse the metadata
    const products = JSON.parse(session.metadata.products);
    const orderInfo = JSON.parse(session.metadata.orderInfo);

    // Extract product IDs from the products
    const productIds = products.map((product) => product.productId);

    // Fetch product data from the database
    const productsData = await Promise.all(
      productIds.map((id) => Product.findById(id))
    );

    if (productsData.length !== products.length) {
      return next(new AppError("One or more products could not be found", 404));
    }

    // Create the order in the database
    await Order.create({
      sessionId,  // Store the sessionId in the order
      ...orderInfo,
      recipient: session.metadata.userId,
      products: products.map((prod) => ({
        product: productsData.find((p) => p._id.toString() === prod.productId)
          .name,
        quantity: prod.quantity,
        price: productsData.find((p) => p._id.toString() === prod.productId)
          .price,
      })),
    });

    res.status(200).json({ success: true });
  } else {
    return next(new AppError("Payment not successful", 400));
  }
});


exports.getMyOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ recipient: req.user.id });
  res.status(200).json(orders);
});
