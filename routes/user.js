const express = require("express");
const {
  getAllUser,
  getSingleUser,
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
} = require("../controllers/user");

const router = express.Router();

router.get("/getUser", getAllUser);
router.get("/get/:id", getSingleUser);
router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
