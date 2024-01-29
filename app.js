require("dotenv").config();

const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
require("./config/dbConnect");
const app = express();
app.use(
  cors({
    origin: "http://127.0.0.1:5502",
    methods: ["GET", "POST", "DELETE", "PUT"],
    // credentials: true,
  })
);
app.use(express.json());

app.use("/user", userRoute);
app.use("/product", productRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
