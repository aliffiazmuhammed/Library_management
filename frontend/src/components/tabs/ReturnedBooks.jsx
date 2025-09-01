import React from "react";

const ReturnedBooks = () => {
  const books = [
    {
      id: 1,
      title: "Book Z",
      author: "Author P",
      genre: "Thriller",
      issuedDate: "2025-07-15",
      returnedDate: "2025-08-01",
    },
    {
      id: 2,
      title: "Book Y",
      author: "Author Q",
      genre: "Science",
      issuedDate: "2025-07-20",
      returnedDate: "2025-08-10",
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
          <p className="text-xs text-green-600">
            Returned: {book.returnedDate}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReturnedBooks;
