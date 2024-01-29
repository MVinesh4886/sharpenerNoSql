const express = require("express");
const router = express.Router();
const { AddProduct, GetAllCart, DeleteItem } = require("../controllers/cart");
const isLogin = require("../middlewares/auth");

router.get("/get", isLogin, GetAllCart);
router.post("/create/:id", isLogin, AddProduct);
router.delete("/delete/:id", isLogin, DeleteItem);

module.exports = router;
