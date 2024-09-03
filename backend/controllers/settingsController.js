const Settings = require("../models/Settings");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getOrCreateShippingPrice = catchAsync(async (req, res, next) => {
  let settings = await Settings.findOne();

  if (!settings) {
    settings = await Settings.create({ shippingPrice: 0 });
  }

  res.status(200).json(settings);
});

exports.updateShippingPrice = catchAsync(async (req, res, next) => {
  const { shippingPrice } = req.body;
  
  const settings = await Settings.findOne();
  if (!settings) {
    return next(new AppError("Settings not found.", 404));
  }

  settings.shippingPrice = shippingPrice;
  await settings.save();

  res.status(200).json(settings);
});
