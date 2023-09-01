module.exports = (error, req, res, next) => {
  if (error.name === "TokenExpiredError") {
    return res.status(401).json({
      status: "error",
      message: "Token has expired",
    });
  }
  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({
      status: "error",
      message: "Invalid token",
    });
  }

  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      error,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
      error,
    });
  }
};
