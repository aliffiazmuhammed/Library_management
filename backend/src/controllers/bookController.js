const Book = require("../models/Book");

const findallbooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch books" });
    }
}

module.exports = {findallbooks}