import React from "react";

const IssuedBooks = () => {
  const books = [
    {
      id: 1,
      title: "Book A",
      author: "Author 1",
      genre: "Horror",
      issuedDate: "2025-08-20",
    },
    {
      id: 2,
      title: "Book B",
      author: "Author 2",
      genre: "History",
      issuedDate: "2025-08-25",
    },
  ];

  return (
    <div className="p-4 grid md:grid-cols-3 sm:grid-cols-2 gap-4">
      {books.map((book) => (
        <div key={book.id} className="p-4 border rounded-md shadow-sm bg-white">
          <h3 className="font-semibold">{book.title}</h3>
          <p className="text-sm text-gray-600">Author: {book.author}</p>
          <p className="text-sm text-gray-500">Genre: {book.genre}</p>
          <p className="text-xs text-blue-600">Issued: {book.issuedDate}</p>
        </div>
      ))}
    </div>
  );
};

export default IssuedBooks;
