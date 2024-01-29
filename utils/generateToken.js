const jwt = require("jsonwebtoken");

const generateToken = (id, name, email) => {
  return jwt.sign({ id, name, email }, process.env.JWT_SECRET_KEY, {
    expiresIn: "10d",
  });
};

module.exports = generateToken;
