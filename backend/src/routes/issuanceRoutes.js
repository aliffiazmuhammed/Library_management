const express = require("express");
const router = express.Router();
const issuanceController = require("../controllers/issuanceController");

// all issued books
router.get("/", issuanceController.getReturnedBooks);



module.exports = router;