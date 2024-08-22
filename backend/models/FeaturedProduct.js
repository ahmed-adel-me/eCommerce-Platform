const mongoose = require("mongoose");
const { Schema } = mongoose;

const featuredProductSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  featuredDate: {
    type: Date,
    default: Date.now,
  },
});

const FeaturedProduct = mongoose.model(
  "FeaturedProduct",
  featuredProductSchema
);

module.exports = FeaturedProduct;
