require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");
const app = require("./app");


mongoose
.connect(process.env.DATABASE)
.then(() => console.log("db is connected"));

const port = process.env.SERVER_PORT || 6000;
app.listen(port, () => {
  console.log(`server is running on: ${port}`);
});
