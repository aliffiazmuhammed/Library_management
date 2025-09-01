const Issuance = require("../models/Issuance");
const Book = require("../models/Book");
const User = require("../models/User");

// ✅ Get all returned books
exports.getReturnedBooks = async (req, res) => {
    try {
        const returnedBooks = await Issuance.find({ returnDate: { $ne: null } })
            .populate("bookId", "title") // only fetch title of book
            .populate("userId", "name email") // fetch user details
            .sort({ returnDate: -1 }); // latest returns first

        // Format response
        const formatted = returnedBooks.map((record) => ({
            id: record._id,
            title: record.bookId?.title || "Unknown",
            issuedTo: {
                name: record.userId?.name || "Unknown",
                email: record.userId?.email || "Unknown",
            },
            issueDate: record.issueDate
                ? record.issueDate.toISOString().split("T")[0]
                : "-",
            dueDate: record.dueDate
                ? record.dueDate.toISOString().split("T")[0]
                : "-", // ✅ include due date
            returnDate: record.returnDate
                ? record.returnDate.toISOString().split("T")[0]
                : "-",
        }));

        res.json(formatted);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserReturnedBooks = async (req, res) => {
    try {
        const { userId } = req.params;

        // Fetch records where returnDate is not null and userId matches
        const returnedBooks = await Issuance.find({
            userId,
            returnDate: { $ne: null },
        })
            .populate("bookId", "title author genre") // fetch title, author, genre
            .populate("userId", "name email") // optional, fetch user details
            .sort({ returnDate: -1 });

        // Format response
        const formatted = returnedBooks.map((record) => ({
            _id: record._id,
            title: record.bookId?.title || "Unknown",
            author: record.bookId?.author || "Unknown",
            genre: record.bookId?.genre || "Unknown",
            issuedTo: {
                name: record.userId?.name || "Unknown",
                email: record.userId?.email || "Unknown",
            },
            issueDate: record.issueDate
                ? record.issueDate.toISOString().split("T")[0]
                : "-",
            returnDate: record.returnDate
                ? record.returnDate.toISOString().split("T")[0]
                : "-",
        }));

        res.json(formatted);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getUserIssuedBooks = async (req, res) => {
    try {
        const { userId } = req.params;

        // Fetch records where returnDate is null (not returned yet)
        const activeIssuedBooks = await Issuance.find({
            userId,
            returnDate: null,
        })
            .populate("bookId", "title author genre") // fetch book details
            .sort({ issueDate: -1 });

        const formatted = activeIssuedBooks.map((record) => ({
            _id: record._id,
            title: record.bookId?.title || "Unknown",
            author: record.bookId?.author || "Unknown",
            genre: record.bookId?.genre || "Unknown",
            issuedTo: {
                name: record.userId?.name || "Unknown",
                email: record.userId?.email || "Unknown",
            },
            issueDate: record.issueDate
                ? record.issueDate.toISOString().split("T")[0]
                : "-",
            dueDate: record.dueDate
                ? record.dueDate.toISOString().split("T")[0]
                : "-",
        }));

        res.json(formatted);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};