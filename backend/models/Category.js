const { Schema, model } = require("mongoose");

const propertySchema = new Schema({
  name: {
    type: String,
    required: [true, "Property must have a name!"],
  },
  values: {
    type: [String],
    required: [true, "Property must have values!"],
  },
});

const categorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Category must have a name!"],
      trim: true,
      maxlength: [40, "Name must be shorter than 40 characters"],
      minlength: [2, "Name must be greater than 2 characters"],
    },
    brands: [String],
    // createdAt: {
    //   type: Date,
    //   default: Date.now(),
    // },
    properties: [propertySchema],
  },
  {
    toJSON: { versionKey: false, virtuals: true },
    toObject: { versionKey: false, virtuals: true },
    timestamps: true,
    // virtuals: true,
  }
);

const Category = model("Category", categorySchema);

module.exports = Category;
