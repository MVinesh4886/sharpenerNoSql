const express = require("express");
const router = express.Router();
const {
  createOrder,
  deleteOrder,
  getAllOrder,
} = require("../controllers/order");
const isLogin = require("../middlewares/auth");

router.post("/create/:id", isLogin, createOrder);
router.delete("/delete/:id", isLogin, deleteOrder);
router.get("/get", isLogin, getAllOrder);

module.exports = router;
