const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

function createAndSendToken(user, res, statusCode = 201) {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // secure: true,
    // httpOnly: true,
  });

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
}

exports.signup = catchAsync(async (req, res, next) => {
  const { email, password, confirmPassword, name, photo } = req.body;
  const newUser = await User.create({
    email,
    password,
    confirmPassword,
    name,
    photo,
  });
  createAndSendToken(newUser, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new AppError("email or password is missing!", 400);
  const user = await User.findOne({ email }).select("+password");
  const correct = user && (await user.comparePassword(password));
  if (!user || !correct)
    throw new AppError("Incorrect email or password!", 401);
  createAndSendToken(user, res, 200);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer"))
    throw new AppError("Provide a valid token!");
  token = token.split(" ")[1];
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) throw new AppError("The token's user no longer exists", 401);
  if (user.changedPasswordAfter(decoded.iat))
    throw new AppError("User changed password", 400);

  req.user = user;
  next();
});

exports.restrectTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError("You don't have permission to perform this action!", 403)
      );

    next();
  };
};

exports.createAdminUser = catchAsync(async (req, res, next) => {
  const { email, password, confirmPassword, name, photo } = req.body;

  const user = await User.create({
    role: "admin",
    email,
    password,
    confirmPassword,
    name,
    photo,
  });
  res.json(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find(req.params);

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});
