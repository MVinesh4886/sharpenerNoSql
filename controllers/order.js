const Order = require("../models/order");
const Product = require("../models/product");

const createOrder = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.json({ message: "Product not found" });
    }

    const order = await Order.findOne({ user: req.user });
    if (!order) {
      const newOrder = await Order.create({
        quantity: req.body.quantity,
        user: req.user,
        products: [product],
      });
      await newOrder.save();
      return res.json({
        message: "Order created successfully",
        data: newOrder,
      });
    } else {
      order.products.push(product);
      await order.save();
      return res.json({
        message: "product added to order successfully",
        data: order,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const getAllOrder = await Order.findOne({ user: req.user }).populate(
      "products"
    );
    return res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      Orders: getAllOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createOrder,
  deleteOrder,
  getAllOrder,
};
