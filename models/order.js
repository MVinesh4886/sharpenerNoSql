const mongoose = require("mongoose");

// const orderItemSchema = new mongoose.Schema({
//   quantity: {
//     type: Number,
//     required: true,
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
//   products: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Product",
//     },
//   ],
// });

const orderItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Order = mongoose.model("Order", orderItemSchema);

module.exports = Order;
