const mongoose = require("mongoose");

const issuanceSchema = new mongoose.Schema(
    {
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // assumes you already have a User model
            required: true,
        },
        issueDate: {
            type: Date,
            default: Date.now,
        },
        dueDate: {
            type: Date,
        },
        returnDate: {
            type: Date,
        },
    },
    { timestamps: true }
);

// 🔹 Pre-save hook to set dueDate = issueDate + 6 days
issuanceSchema.pre("save", function (next) {
    if (!this.dueDate) {
        const issueDate = this.issueDate || new Date();
        this.dueDate = new Date(issueDate.getTime() + 6 * 24 * 60 * 60 * 1000); // 6 days later
    }
    next();
});

module.exports = mongoose.model("Issuance", issuanceSchema);
