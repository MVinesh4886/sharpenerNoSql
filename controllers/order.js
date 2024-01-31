const Order = require("../models/order");
const Product = require("../models/product");

// const createOrder = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.json({ message: "Product not found" });
//     }

//     const order = await Order.findOne({ user: req.user });
//     if (!order) {
//       const newOrder = await Order.create({
//         quantity: req.body.quantity,
//         user: req.user,
//         products: [product],
//       });
//       await newOrder.save();
//       return res.json({
//         message: "Order created successfully",
//         data: newOrder,
//       });
//     } else {
//       // Check if the product is already in the order
//       const existingProduct = order.products.find(
//         (p) => p.toString() === product._id.toString()
//       );

//       if (existingProduct) {
//         // If the product is already in the order, update the quantity
//         existingProduct.quantity += req.body.quantity;
//       } else {
//         order.products.push(product);
//       }
//       // order.products.push(product);
//       await order.save();
//       return res.json({
//         message: "product added to order successfully",
//         data: order,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

const createOrder = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.json({ message: "Product not found" });
    }

    const order = await Order.findOne({ user: req.user });
    if (!order) {
      const newOrder = await Order.create({
        user: req.user,
        products: [{ product: product._id, quantity: req.body.quantity }],
      });
      await newOrder.save();
      return res.json({
        message: "Order created successfully",
        data: newOrder,
      });
    } else {
      // Check if the product is already in the order
      const existingProduct = order.products.find(
        (p) => p.product.toString() === product._id.toString()
      );

      if (existingProduct) {
        // If the product is already in the order, update the quantity
        existingProduct.quantity += req.body.quantity;
      } else {
        order.products.push({
          product: product._id,
          quantity: req.body.quantity,
        });
      }

      await order.save();
      return res.json({
        message: "Product added to order successfully",
        data: order,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// const deleteOrder = async (req, res) => {
//   try {
//     await Order.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Order deleted successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ user: req.user });
    const product = await Product.findById(req.params.id);

    // Find the index of the product to be deleted
    const productIndex = order.products.find(
      (element) => element.toString() === product._id.toString()
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ message: "Product not found in the Orders" });
    }

    order.products.splice(productIndex, 1);
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Product deleted from the Orders successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllOrder = async (req, res) => {
  try {
    // const getAllOrder = await Order.find().populate("products");
    const getAllOrder = await Order.findOne({ user: req.user }).populate({
      path: "products",
      populate: {
        path: "product",
        model: "Product",
      },
    });
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
