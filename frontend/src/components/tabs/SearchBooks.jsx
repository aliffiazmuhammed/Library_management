import React, { useState } from "react";

const SearchBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("title");

  const books = [
    { id: 1, title: "Book One", author: "Author A", genre: "Fiction" },
    { id: 2, title: "Book Two", author: "Author B", genre: "Science" },
    { id: 3, title: "Another Story", author: "Author C", genre: "Fiction" },
  ];

  const filteredBooks = books.filter((book) =>
    book[filter].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder={`Search by ${filter}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border p-2 rounded-md"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="title">Title</option>
          <option value="genre">Genre</option>
        </select>
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="p-4 border rounded-md shadow-sm bg-white"
          >
            <h3 className="font-semibold">{book.title}</h3>
            <p className="text-sm text-gray-600">Author: {book.author}</p>
            <p className="text-sm text-gray-500">Genre: {book.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBooks;
