const Book = require("../models/Book");
const Issuance = require("../models/Issuance");
const User = require("../models/User"); // your user model

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new book
exports.addBook = async (req, res) => {
    try {
        const { title, author, genre, publicationDate } = req.body;
        const newBook = new Book({ title, author, genre, publicationDate });
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update book details
exports.updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedBook = await Book.findByIdAndUpdate(id, updates, { new: true });
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        await Book.findByIdAndDelete(id);
        res.json({ message: "Book deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Issue a book
exports.issueBook = async (req, res) => {
    try {
        const { id } = req.params; // book ID
        const { email } = req.body; // get user email from request

        const book = await Book.findById(id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        if (book.status === "issued") return res.status(400).json({ message: "Book already issued" });

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Create issuance record
        const issuance = new Issuance({ bookId: book._id, userId: user._id });
        await issuance.save();

        // Update book status
        book.status = "issued";
        await book.save();

        res.json({ message: "Book issued successfully", book, issuance });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Return a book
exports.returnBook = async (req, res) => {
    try {
        const { id } = req.params; // book ID

        const book = await Book.findById(id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        if (book.status === "available")
            return res.status(400).json({ message: "Book is already available" });

        // Find the latest issuance record that hasn't been returned yet
        const issuance = await Issuance.findOne({ bookId: id, returnDate: null }).sort({
            createdAt: -1,
        });

        if (issuance) {
            const now = new Date();
            issuance.returnDate = now;
            issuance.dueDate = now; // set dueDate as returned date
            await issuance.save();
        }

        // Update book status
        book.status = "available";
        await book.save();

        res.json({ message: "Book returned successfully", book, issuance });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllIssuedBooks = async (req, res) => {
    try {
        // Find all issuance records where returnDate is null (not returned)
        const issuedRecords = await Issuance.find({ returnDate: null })
            .populate("bookId") // get book details
            .populate("userId", "name email") // get user details
            .sort({ issueDate: -1 });

        // Format response
        const issuedBooks = issuedRecords.map((record) => ({
            _id: record._id,
            title: record.bookId.title,
            genre: record.bookId.genre,
            author: record.bookId.author,
            publicationDate: record.bookId.publicationDate,
            status: record.bookId.status,
            issuedTo: {
                _id: record.userId._id,
                name: record.userId.name,
                email: record.userId.email,
            },
            issueDate: record.issueDate,
            dueDate: record.dueDate,
        }));

        res.json(issuedBooks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch issued books", error: err.message });
    }
};