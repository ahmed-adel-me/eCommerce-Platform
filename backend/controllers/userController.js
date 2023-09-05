const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.getUserProfile = catchAsync(async (req, res, next) => {
  const userId = req.params.userId || req.user.id;
  const user = await User.findById(userId);
  res.status(200).json({
    user,
  });
});

exports.updateMyProfile = catchAsync(async (req, res, next) => {
  const { name, email, city, country, postalCode, streetAddress } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, email, city, country, postalCode, streetAddress },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    user,
  });
});
