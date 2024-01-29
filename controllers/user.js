const User = require("../../sharpener-nosql/models/user");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const Token = generateToken(
      createUser._id,
      createUser.name,
      createUser.email
    );
    console.log(Token);

    res.json({
      success: true,
      message: "Data created successfully",
      data: createUser,
      token: Token,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Unable to create user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const Token = generateToken(userFound._id, userFound.name, userFound.email);
    res
      .status(200)
      .json({
        success: true,
        message: "login successful",
        data: userFound,
        token: Token,
      });
    console.log(userFound);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Unable to create user" });
  }
};

const getAllUser = async (req, res) => {
  try {
    const userData = await User.find();
    res.json({
      success: true,
      message: "Data fetched successfully",
      data: userData,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Unable to get user" });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const userData = await User.findById(req.params.id);
    res.json({
      success: true,
      message: "Data fetched successfully",
      data: userData,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Unable to get user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUser,
  getSingleUser,
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
};
