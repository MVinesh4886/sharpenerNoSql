const express = require("express");
const {
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/user");

const router = express.Router();

router.get("/getUser", getUser);
router.post("/createUser", createUser);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
