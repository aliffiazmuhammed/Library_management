import React from "react";

const AvailableBooks = () => {
  const books = [
    { id: 1, title: "Book Alpha", author: "Author X", genre: "Drama" },
    { id: 2, title: "Book Beta", author: "Author Y", genre: "Fantasy" },
  ];

  return (
    <div className="p-4 grid md:grid-cols-3 sm:grid-cols-2 gap-4">
      {books.map((book) => (
        <div key={book.id} className="p-4 border rounded-md shadow-sm bg-white">
          <h3 className="font-semibold">{book.title}</h3>
          <p className="text-sm text-gray-600">Author: {book.author}</p>
          <p className="text-sm text-gray-500">Genre: {book.genre}</p>
        </div>
      ))}
    </div>
  );
};

export default AvailableBooks;
