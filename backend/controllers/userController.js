const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  res.json({ message: "Register user sucessful" });
});

const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login user sucessful" });
});

const getCurrentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current user data" });
});

module.exports = { registerUser, loginUser, getCurrentUser };
