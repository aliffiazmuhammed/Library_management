const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        author: {
            type: String,
            required: true,
            trim: true,
        },
        genre: {
            type: String,
            required: true,
        },
        publicationDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["available", "issued"],
            default: "available",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
