const mongoose = require("mongoose");
const Book = require("./src/models/Book");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();
const seedAdminAndLibrarian = async () => {
    await mongoose.connect(process.env.MONGO_URI);

    const books = [
        {
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            genre: "Fiction",
            publicationDate: new Date("1960-07-11"),
            status: "available",
        },
        {
            title: "1984",
            author: "George Orwell",
            genre: "Dystopian",
            publicationDate: new Date("1949-06-08"),
            status: "available",
        },
        {
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            genre: "Classic",
            publicationDate: new Date("1925-04-10"),
            status: "available",
        },
        {
            title: "The Catcher in the Rye",
            author: "J.D. Salinger",
            genre: "Fiction",
            publicationDate: new Date("1951-07-16"),
            status: "available",
        },
        {
            title: "Pride and Prejudice",
            author: "Jane Austen",
            genre: "Romance",
            publicationDate: new Date("1813-01-28"),
            status: "available",
        },
    ];

    await Book.insertMany(books);

    console.log("✅ Admin & Librarian seeded");
    mongoose.disconnect();
};

seedAdminAndLibrarian();
