const mongoose = require("mongoose");

//Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

//compile the schema to form a model
const User = mongoose.model("User", userSchema);

module.exports = User;
