import React, { useState, useEffect } from "react";
import axios from "axios";
import { allBookRoute } from "@/utils/APIRoutes";

const AllIssuedBooks = ({ onReturn }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);

  // Fetch all currently issued books
  const fetchIssuedBooks = async () => {
    try {
      const res = await axios.get(`${allBookRoute}/allissued`); // backend endpoint that returns issued books
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchIssuedBooks();
  }, []);

  // Handle returning a book
  const handleReturn = async (bookId) => {
    try {
      const res = await axios.put(`/api/books/return/${bookId}`); // call your returnBook API
      // Update local state
      setBooks(books.filter((b) => b._id !== bookId));

      if (onReturn) {
        onReturn(res.data.book);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by book name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        />
      </div>

      {/* Desktop Table */}
      <table className="hidden md:table w-full border-collapse border border-slate-300">
        <thead>
          <tr className="bg-slate-200">
            <th className="border p-2">Title</th>
            <th className="border p-2">Issued To</th>
            <th className="border p-2">Issue Date</th>
            <th className="border p-2">Due Date</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book._id} className="text-center">
              <td className="border p-2">{book.title}</td>
              <td className="border p-2">
                {book.issuedTo.name} ({book.issuedTo.email})
              </td>
              <td className="border p-2">
                {new Date(book.issueDate).toLocaleDateString()}
              </td>
              <td className="border p-2">
                {new Date(book.dueDate).toLocaleDateString()}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleReturn(book._id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Return
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="md:hidden grid gap-4">
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            className="bg-white p-4 rounded-lg shadow flex flex-col gap-1"
          >
            <h3 className="font-semibold text-lg">{book.title}</h3>
            <p className="text-sm text-gray-700">
              Issued To: {book.issuedTo.name} ({book.issuedTo.email})
            </p>
            <p className="text-sm text-gray-700">
              Issue Date: {new Date(book.issueDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-700">
              Due Date: {new Date(book.dueDate).toLocaleDateString()}
            </p>
            <button
              onClick={() => handleReturn(book._id)}
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
            >
              Return
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllIssuedBooks;
