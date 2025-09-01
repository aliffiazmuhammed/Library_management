import React from "react";

const BookCard = ({ book, onEdit, onIssue, onDelete, onReturn }) => (
  <div className="bg-white p-4 rounded-lg shadow flex flex-col justify-between">
    <div className="mb-2">
      <h3 className="font-semibold text-lg">{book.title}</h3>
      <p className="text-sm text-gray-600">{book.author}</p>
      <p className="text-sm text-gray-500">{book.genre}</p>
      <p className="text-sm text-gray-500">
        {book.publicationDate
          ? new Date(book.publicationDate).toLocaleDateString()
          : "-"}
      </p>
      <p
        className={`mt-1 text-sm font-semibold ${
          book.status === "available" ? "text-green-600" : "text-red-600"
        }`}
      >
        {book.status === "available" ? "Available" : "Issued"}
      </p>
    </div>
    <div className="flex flex-wrap gap-2 mt-2">
      <button
        onClick={onEdit}
        className="bg-blue-500 text-white px-2 py-1 rounded"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Delete
      </button>
      {book.status === "available" ? (
        <button
          onClick={onIssue}
          className="bg-purple-500 text-white px-2 py-1 rounded"
        >
          Issue
        </button>
      ) : (
        <button
          onClick={onReturn}
          className="bg-green-500 text-white px-2 py-1 rounded"
        >
          Return
        </button>
      )}
    </div>
  </div>
);

export default BookCard;
