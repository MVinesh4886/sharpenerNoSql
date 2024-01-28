const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;
