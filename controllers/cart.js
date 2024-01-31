const Cart = require("../models/cart");
const Product = require("../models/product");

//add product to the cart
const AddProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.json({ message: "Product not found" });
    }

    const cart = await Cart.findOne({ user: req.user });
    if (!cart) {
      const newCart = await Cart.create({
        user: req.user,
        products: [product],
      });
      await newCart.save();
      return res.json({
        message: "Cart created successfully",
        data: newCart,
      });
    } else {
      const productExists = cart.products.find(
        (element) => element.toString() === product._id.toString()
      );
      if (productExists) {
        return res.json({ message: "Product already exists in the cart" });
      }

      cart.products.push(product);
      await cart.save();
      return res.json({
        message: "Product added to cart successfully",
        data: cart,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const GetAllCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user }).populate("products");
    // const cart = await Cart.find().populate("products");
    if (!cart) {
      return res.json({ message: "Cart is empty" });
    }

    return res.json({
      success: true,
      message: "fetched all items from cart",
      CartItems: cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//To delete entire cart
// const DeleteItem = async (req, res) => {
//   try {
//     await Cart.findByIdAndDelete(req.params.id);
//     return res
//       .status(200)
//       .json({ success: true, message: "product deleted successfully" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

const DeleteItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user });
    const product = await Product.findById(req.params.id);

    // Find the index of the product to be deleted
    const productIndex = cart.products.find(
      (element) => element.toString() === product._id.toString()
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in the cart" });
    }

    // Remove the product from the cart
    cart.products.splice(productIndex, 1);
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product deleted from the cart successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  AddProduct,
  GetAllCart,
  DeleteItem,
};
