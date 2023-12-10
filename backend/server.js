const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(cors());
const dotenv = require("dotenv").config();

//app middleware
app.use(bodyParser.json());

//route imports
const usersRoutes = require("./routes/userRoutes");
const kitchenRoutes = require("./routes/kitchenRoutes");
const productRoutes = require("./routes/productRoutes");
const billInfoRoutes = require("./routes/billInfoRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");

//routes
app.use("/api/users", usersRoutes);
app.use("/api/kitchen", kitchenRoutes);
app.use("/api/products", productRoutes);
app.use("/api/billInfo", billInfoRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/cart", cartRoutes);

const port = process.env.PORT;

const DB_URL = process.env.MONGODB_URI;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection established");
  })
  .catch((err) => {
    console.log("DB connection error", err);
  });

app.listen(port, () => {
  console.log(`app is running ${port}`);
});
