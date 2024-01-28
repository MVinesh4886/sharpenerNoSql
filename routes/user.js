const express = require("express");
const { getUser, createUser, deleteUser } = require("../controllers/user");

const router = express.Router();

router.get("/getUser", getUser);
router.post("/createUser", createUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
