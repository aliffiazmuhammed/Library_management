import React, { useState, useEffect } from "react";
import axios from "axios";
import { allreturnedbookRoute } from "@/utils/APIRoutes";
const AllReturnedBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [returnedBooks, setReturnedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch returned books from backend
  useEffect(() => {
    const fetchReturnedBooks = async () => {
      try {
        const res = await axios.get(allreturnedbookRoute);
        setReturnedBooks(res.data);
      } catch (err) {
        console.error("Error fetching returned books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReturnedBooks();
  }, []);

  // Filter books
  const filteredBooks = (returnedBooks || []).filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p className="p-4 text-gray-500">Loading returned books...</p>;
  }

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
            <th className="border p-2">Return Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book._id} className="text-center">
              <td className="border p-2">{book.title}</td>
              <td className="border p-2">
                {book.issuedTo?.name} ({book.issuedTo?.email})
              </td>
              <td className="border p-2">
                {new Date(book.issueDate).toLocaleDateString()}
              </td>
              <td className="border p-2">
                {new Date(book.returnDate).toLocaleDateString()}
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
              Issued To: {book.issuedTo?.name} ({book.issuedTo?.email})
            </p>
            <p className="text-sm text-gray-700">
              Issue Date: {new Date(book.issueDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-700">
              Return Date: {new Date(book.returnDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReturnedBooks;
