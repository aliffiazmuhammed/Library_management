const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Get all users
router.get("/", userController.getUsers);

// Get issued books of a user
router.get("/:userId/issued", userController.getUserIssuedBooks);

// Get returned books of a user
router.get("/:userId/returned", userController.getUserReturnedBooks);

// Update user
router.put("/:userId", userController.updateUser);

// Delete user
router.delete("/:userId", userController.deleteUser);

module.exports = router;
