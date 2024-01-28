const User = require("../../sharpener-nosql/models/user");
//get all users
const getUser = async (req, res) => {
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

const createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const createdUser = await User.create({ name, email });
    res.json({
      success: true,
      message: "Data created successfully",
      data: createdUser,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Unable to create user" });
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
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
