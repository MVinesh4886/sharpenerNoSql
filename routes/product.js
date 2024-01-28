const express = require("express");
const router = express.Router();
const {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

router.get("/get", getProduct);
router.post("/create", createProduct);
router.delete("/delete/:id", deleteProduct);
router.put("/update/:id", updateProduct);

module.exports = router;
