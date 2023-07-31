const express = require("express");
const app = express();
const productRouter = require("./routes/productRoutes");

app.use("/api/products", productRouter);

app.use((error, req, res, next) => {
  res.status(400).json({
    error,
  });
});
module.exports = app;
