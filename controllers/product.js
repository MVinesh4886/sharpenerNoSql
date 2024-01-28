const Product = require("../models/product");

const createProduct = async (req, res) => {
  try {
    const { title, price, imageUrl, description } = req.body;

    const product = await Product.create({
      title,
      price,
      imageUrl,
      description,
    });

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
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
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
  deleteProduct,
  updateProduct,
};
