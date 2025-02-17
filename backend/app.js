const express = require("express");
const cors = require("cors");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const orderRouter = require("./routes/orderRoutes");
const settingsRouter = require("./routes/settingsRoutes.js");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/AppError");
const reviewRouter = require("./routes/reviewRoutes");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const app = express();
//middlewares
app.use(helmet());

app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json());
app.use(mongoSanitize());
//routes
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/orders", orderRouter);
app.use("/api/settings", settingsRouter);
app.use("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on the server`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
