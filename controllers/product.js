const Product = require("../models/product");
const User = require("../models/user");

const createProduct = async (req, res) => {
  try {
    const { title, price, imageUrl, description } = req.body;

    const product = await Product.create({
      title,
      price,
      imageUrl,
      description,
      user: req.user,
    });

    const user = await User.findById(req.user);
    user.products.push(product._id);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserProduct = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const products = await Product.find({ user: user._id }); // Retrieve products associated with the user
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

//*To delete all products
// const deleteProduct = async (req, res) => {
//   try {
//     await Product.deleteMany();
//     res.status(200).json({
//       success: true,
//       message: "Product deleted successfully",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

const updateProduct = async (req, res) => {
  try {
    const { title, price, imageUrl, description } = req.body;
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { title, price, imageUrl, description },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updateProduct,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createProduct,
  getProduct,
  getUserProduct,
  deleteProduct,
  updateProduct,
};
