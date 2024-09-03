const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    shippingPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model("Settings", settingsSchema);

module.exports = Settings;
