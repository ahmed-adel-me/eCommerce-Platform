const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.getUserProfile = catchAsync(async (req, res, next) => {
  const userId = req.params.userId || req.user.id;
  const user = await User.findById(userId);
  res.status(200).json({
    user,
  });
});
