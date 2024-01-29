const express = require("express");
const router = express.Router();
const {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const isLogin = require("../middlewares/auth");

router.get("/get", getProduct);
router.post("/create", isLogin, createProduct);
router.delete("/delete/:id", isLogin, deleteProduct);
router.put("/update/:id", isLogin, updateProduct);

module.exports = router;
