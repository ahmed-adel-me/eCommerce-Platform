const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product must have a name!"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Product must have a price!"],
      min: [0, "Price must be above 0"],
    },
    description: {
      type: String,
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now(),
    // },
    category: {
      categoryRef: {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
      brand: {
        type: String,
        trim: true,
      },
      properties: {
        type: Map,
        of: String,
        default: {},
      },
    },
    creator: {
      type: Schema.ObjectId,
      ref: "User",
      required: [true, "Product must belong to an admin"],
    },
  },
  {
    timestamps: true,
    // Set toJSON and toObject options to transform _id to id
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        ret.id = ret._id;
      },
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        ret.id = ret._id;
      },
    },
  }
);

productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});


productSchema.virtual('wished').get(function () {
  // This will be dynamically set during query
  return this._wished || false;
});

// Function to add wished status to products based on the logged-in user
productSchema.methods.setWishedStatus = function (userWishlist) {
  this._wished = userWishlist.includes(this._id);
  return this;
};

// Example of setting the wished status for multiple products
productSchema.statics.setWishedStatusForProducts = function (products, userWishlist) {
  return products.map(product => {
    product.setWishedStatus(userWishlist);
    return product;
  });
};
const Product = model("Product", productSchema);
module.exports = Product;
