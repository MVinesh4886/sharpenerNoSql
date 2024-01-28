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
  Product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

//compile the schema to form a model
const User = mongoose.model("User", userSchema);

module.exports = User;
