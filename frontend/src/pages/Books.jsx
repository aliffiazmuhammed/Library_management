// src/pages/Books.js
import React, { useState } from "react";

const mockBooks = [
    { id: 1, title: "Book A", author: "Author A", status: "Available" },
    { id: 2, title: "Book B", author: "Author B", status: "Issued" },
];

const Books = () => {
    const [books, setBooks] = useState(mockBooks);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Books</h2>
            {books.map((book) => (
                <div key={book.id} style={{ margin: "10px 0" }}>
                    <strong>{book.title}</strong> by {book.author} - {book.status}
                </div>
            ))}
        </div>
    );
};

export default Books;
