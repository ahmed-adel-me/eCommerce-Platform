const express = require("express");
const cors = require("cors");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/AppError");
const reviewRouter = require("./routes/reviewRoutes");
const cookieParser = require("cookie-parser");

const app = express();
//middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json());
//routes
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/reviews", reviewRouter);
app.use("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on the server`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
