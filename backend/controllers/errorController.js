module.exports = (error, req, res, next) => {
  //   if (error.isOperational) {
  //     res.status(error.statusCode).json({
  //       status: error.status,
  //       message: error.message,
  //       error,
  //     });
  //   } else {
  //     res.status(500).json({
  //       status: "error",
  //       message: "Something went wrong!",
  //     });
  //   }
  error.statusCode = error.statusCode || 400;
  error.status = error.status || "error";
  res.status(error.statusCode).json({
    status: error.status,
    error,
    message: error.message,
    stack: error.stack,
  });
};
