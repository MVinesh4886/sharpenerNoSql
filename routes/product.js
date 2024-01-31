const express = require("express");
const router = express.Router();
const {
  getProduct,
  createProduct,
  updateProduct,
  getUserProduct,
  deleteProduct,
} = require("../controllers/product");

const isLogin = require("../middlewares/auth");

router.get("/get", getProduct);
router.get("/getUserProduct", isLogin, getUserProduct);
router.post("/create", isLogin, createProduct);
router.delete("/delete/:id", isLogin, deleteProduct);

//To delete all products
// router.delete("/delete", deleteProduct);
router.put("/update/:id", isLogin, updateProduct);

module.exports = router;
