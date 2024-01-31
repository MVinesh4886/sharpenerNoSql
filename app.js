require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
require("./config/dbConnect");
const app = express();
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "DELETE", "PUT"],
    // credentials: true,
  })
);
app.use(express.json());

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, `public/${req.url}`));
});

// app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
