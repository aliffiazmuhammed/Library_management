const express = require("express");
const router = express.Router();
const issuanceController = require("../controllers/issuanceController");

// all issued books
router.get("/", issuanceController.getReturnedBooks);
// GET returned books for a user
router.get("/returnbooks/:userId", issuanceController.getUserReturnedBooks);
// GET active issued books for a user
router.get("/issuedbooks/:userId/issued", issuanceController.getUserIssuedBooks);

module.exports = router;