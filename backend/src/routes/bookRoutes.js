const express = require("express");
const router = express.Router();
const { findallbooks } =require("../controllers/bookController")


// Get all books
router.get("/all",findallbooks );

module.exports = router;
