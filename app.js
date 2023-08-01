const express = require("express");
const app = express();
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const globalErrorHandler = require("./controllers/errorController");

//middlewares
app.use(express.json());

//routes
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.use(globalErrorHandler);

module.exports = app;
