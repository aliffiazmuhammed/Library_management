const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// CRUD operations
router.get("/", bookController.getAllBooks);
router.post("/", bookController.addBook);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

// Issue / Return
router.put("/issue/:id", bookController.issueBook);
router.put("/return/:id", bookController.returnBook);

//issuedbooks that are active
router.get("/allissued",bookController.getAllIssuedBooks)

// Get available books
router.get("/available", bookController.availableBooks);


module.exports = router;