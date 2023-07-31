const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Category must have a name!"],
    trim: true,
    maxlength: [40, "name must be lower than 40"],
    minlength: [10, "name must be grater than 10"],
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
        unique: true,
        trim: true,
        maxlength: [40, "name must be lower than 40"],
        minlength: [10, "name must be grater than 10"],
      },
      value: [
        {
          type: String,
          required: [true, "Property value must be provided!"],
        },
      ],
    },
  ],
});

const Category = model("Category", categorySchema);

module.exports = Category;
