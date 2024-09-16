const { Schema, model } = require("mongoose");
const { default: isEmail } = require("validator/lib/isemail");
const Settings = require("./Settings");

const orderSchema = new Schema(
  {
    sessionId: {
      type: String,
      required: [true, "Session ID is required"],
      // unique: true, // Ensure the sessionId is unique to prevent duplicates
    },
    date: {
      type: Date,
      default: Date.now,
    },
    name: {
      type: String,
      required: [true, "User name is missing!"],
    },
    email: {
      type: String,
      required: [true, "Email is missing!"],
      validate: [isEmail, "Enter a valid email!"],
      lowercase: true,
    },
    country: {
      type: String,
      required: [true, "Provide your country"],
    },
    city: {
      type: String,
      required: [true, "Provide your city"],
    },
    postalCode: {
      type: String,
      required: [true, "Postal code is missing"],
    },
    streetAddress: {
      type: String,
      required: [true, "Street address is missing"],
    },
    recipient: {
      type: Schema.ObjectId,
      ref: "User",
      required: [true, "Provide a recipient"],
    },
    products: {
      type: [
        {
          product: { type: String, required: true },
          quantity: {
            type: Number,
            default: 1,
            min: [1, "Quantity must be at least 1"],
          },
          price: {
            type: Number,
            required: true,
            min: [0, "Price must be at least 0"],
          },
        },
      ],
      required: [true, "Order must have products"],
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    toJSON: { versionKey: false, virtuals: true },
    toObject: { versionKey: false, virtuals: true },
  }
);

// Calculate totalPrice before saving the order
orderSchema.pre("save", async function (next) {
  this.totalPrice = this.products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const settings = await Settings.findOne();
  const shippingPrice = settings ? settings.shippingPrice : 0;
  this.totalPrice += shippingPrice;
  next();
});

const Order = model("Order", orderSchema);
module.exports = Order;
