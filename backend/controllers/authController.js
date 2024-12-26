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
    sameSite: "none",
    secure: true,
    httpOnly: true,
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
  const {
    email,
    password,
    confirmPassword,
    name,
    photo,
    city,
    country,
    streetAddress,
    postalCode,
  } = req.body;
  const newUser = await User.create({
    email,
    password,
    confirmPassword,
    name,
    photo,
    city,
    country,
    streetAddress,
    postalCode,
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
exports.logout = catchAsync(async (req, res, next) => {
  res.clearCookie("jwt");
  res.status(200).json("success");
});
exports.protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token)
    throw new AppError("You are not logged in! Please login first.", 401);
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) throw new AppError("The token's user no longer exists", 401);
  if (user.changedPasswordAfter(decoded.iat))
    throw new AppError("User changed password", 401);

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

exports.createAdmin = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  // Validate required fields
  if (!email || !password || !confirmPassword || !name) {
    return next(
      new AppError(
        "Please provide an email, password, and confirmPassword",
        400
      )
    );
  }

  // Check if the passwords match
  if (password !== confirmPassword) {
    return next(new AppError("Passwords do not match", 400));
  }

  const admin = await User.create({
    name,
    email,
    password,
    confirmPassword,
    role: "admin",
    country: "Not provided",
    city: "Not provided",
    postalCode: "00000",
    streetAddress: "Not provided",
  });

  res.status(201).json(admin);
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const { role } = req.query;
  let query = {};
  if (role) {
    query.role = role;
  }
  const users = await User.find(query);

  res.status(200).json(users);
});
