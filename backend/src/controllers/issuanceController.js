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
