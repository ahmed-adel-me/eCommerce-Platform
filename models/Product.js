const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product must have a name!"],
    },
    brand: {
      type: String,
      required: "Product must have a brand!",
    },
    categories: [{ type: Schema.ObjectId, ref: "Category" }],
    color: String,

    price: {
      type: Number,
      required: [true, "Product must have a price!"],
      min: [0, "Price must be above 0"],
    },
    description: {
      type: String,

      trim: true,
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    category: {
      type: Schema.ObjectId,
      ref: "Category",
    },
    creator: {
      type: Schema.ObjectId,
      ref: "User",
      required: [true, "Product must belong to an admin"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { versionKey: false, virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

const Product = model("Product", productSchema);
module.exports = Product;
