require("dotenv").config();

const express = require("express");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
require("./config/dbConnect");
const app = express();
app.use(express.json());

app.use("/user", userRoute);
app.use("/product", productRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
