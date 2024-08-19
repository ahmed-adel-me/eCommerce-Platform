module.exports = (err, req, res, next) => {
  // Set default status code for unknown errors
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";

  // Handle specific JWT errors
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token has expired";
  } else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }
  if (err.name === "MongoServerError") {
    if (err.code === 11000) {
      // Duplicate key error
      statusCode = 400;
      message = `${Object.values(err.keyValue).join(', ')} already exists.`;
    } else {
      // Other MongoServerErrors
      statusCode = 500;
      message = err.message || "A database error occurred";
    }
  }

  // Handle operational errors
  if (err.isOperational) {
    return res.status(statusCode).json({
      status: err.status || "error",
      message: message,
      error: err.isOperational ? err : undefined, // Provide detailed error information for operational errors
    });
  }

  // Handle non-operational errors (programming errors, etc.)
  return res.status(statusCode).json({
    status: "error",
    message: message,
    // Optionally include stack trace in development
    error: process.env.NODE_ENV === "development" ? err : {}, // Avoid exposing stack trace in production
  });
};
