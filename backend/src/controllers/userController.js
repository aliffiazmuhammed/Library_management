const User = require("../models/User");
const Issuance = require("../models/Issuance");

// ✅ Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}, "name email role"); // only fetch name + email
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Get all active issued books for a user
exports.getUserIssuedBooks = async (req, res) => {
    try {
        const { userId } = req.params;
        const issuedBooks = await Issuance.find({
            userId,
            returnDate: null
        })
            .populate("bookId", "title")
            .sort({ issueDate: -1 });

        const formatted = issuedBooks.map(record => ({
            id: record._id,
            title: record.bookId?.title || "Unknown",
            issueDate: record.issueDate
                ? record.issueDate.toISOString().split("T")[0]
                : "-",
            dueDate: record.dueDate
                ? record.dueDate.toISOString().split("T")[0]
                : "-"
        }));

        res.json(formatted);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Get all returned books for a user
exports.getUserReturnedBooks = async (req, res) => {
    try {
        const { userId } = req.params;
        const returnedBooks = await Issuance.find({
            userId,
            returnDate: { $ne: null }
        })
            .populate("bookId", "title")
            .sort({ returnDate: -1 });

        const formatted = returnedBooks.map(record => ({
            id: record._id,
            title: record.bookId?.title || "Unknown",
            issueDate: record.issueDate
                ? record.issueDate.toISOString().split("T")[0]
                : "-",
            dueDate: record.dueDate
                ? record.dueDate.toISOString().split("T")[0]
                : "-",
            returnDate: record.returnDate
                ? record.returnDate.toISOString().split("T")[0]
                : "-"
        }));

        res.json(formatted);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Edit user
exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, email , role } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email , role },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Delete user
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });

        // Optional: also delete user’s issuance records
        await Issuance.deleteMany({ userId });

        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
