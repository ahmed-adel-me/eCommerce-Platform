const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Category must have a name!"],
      trim: true,
      maxlength: [40, "name must be lower than 40"],
      minlength: [2, "name must be grater than 2"],
    },
    parentCategory: {
      type: Schema.ObjectId,
      ref: "Category",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    properties: [
      {
        name: {
          type: String,
          trim: true,
          maxlength: [40, "name must be lower than 40"],
          minlength: [2, "name must be grater than 2"],
        },
        value: [
          {
            type: String,
            required: [true, "Property value must be provided!"],
          },
        ],
      },
    ],
  },
  { toJSON: { versionKey: false }, toObject: { versionKey: false } }
);

const Category = model("Category", categorySchema);

module.exports = Category;
