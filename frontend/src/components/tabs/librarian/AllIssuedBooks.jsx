import React, { useState } from "react";

const AllIssuedBooks = ({ onReturn }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Clean Code",
      issuedTo: { name: "John Doe", email: "john@example.com" },
      issueDate: "2025-08-01",
      dueDate: "2025-08-15",
      returned: false,
    },
    {
      id: 2,
      title: "Atomic Habits",
      issuedTo: { name: "Jane Smith", email: "jane@example.com" },
      issueDate: "2025-08-03",
      dueDate: "2025-08-17",
      returned: false,
    },
  ]);

  const handleReturn = (id) => {
    const updatedBooks = books.map((b) =>
      b.id === id
        ? {
            ...b,
            returned: true,
            returnDate: new Date().toISOString().split("T")[0],
          }
        : b
    );
    setBooks(updatedBooks);

    if (onReturn) {
      const returnedBook = updatedBooks.find((b) => b.id === id);
      onReturn(returnedBook);
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
          {filteredBooks.map(
            (book) =>
              !book.returned && (
                <tr key={book.id} className="text-center">
                  <td className="border p-2">{book.title}</td>
                  <td className="border p-2">
                    {book.issuedTo.name} ({book.issuedTo.email})
                  </td>
                  <td className="border p-2">{book.issueDate}</td>
                  <td className="border p-2">{book.dueDate}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleReturn(book.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Return
                    </button>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="md:hidden grid gap-4">
        {filteredBooks.map(
          (book) =>
            !book.returned && (
              <div
                key={book.id}
                className="bg-white p-4 rounded-lg shadow flex flex-col gap-1"
              >
                <h3 className="font-semibold text-lg">{book.title}</h3>
                <p className="text-sm text-gray-700">
                  Issued To: {book.issuedTo.name} ({book.issuedTo.email})
                </p>
                <p className="text-sm text-gray-700">
                  Issue Date: {book.issueDate}
                </p>
                <p className="text-sm text-gray-700">
                  Due Date: {book.dueDate}
                </p>
                <button
                  onClick={() => handleReturn(book.id)}
                  className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
                >
                  Return
                </button>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default AllIssuedBooks;
