const { Schema, model } = require("mongoose");
const { default: isEmail } = require("validator/lib/isemail");

const orderSchema = new Schema(
  {
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
      required: [true, "postalCode is missing"],
    },
    streetAddress: {
      type: String,
      required: [true, "streetAddress is missing"],
    },
    paid: {
      type: Boolean,
      default: false,
    },
    recipient: {
      type: Schema.ObjectId,
      ref: "User",
      required: [true, "Provide a recipient"],
    },
    products: {
      type: [
        {
          product: String,
          quantity: { type: Number, default: 1 },
        },
      ],
      required: [true, "Order must have products"],
    },
  },
  {
    toJSON: { versionKey: false, virtuals: true },
    toObject: { versionKey: false, virtuals: true },
  }
);

const Order = model("Order", orderSchema);
module.exports = Order;
