import React, { useState } from "react";

const ManageBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Clean Code",
      author: "Robert C. Martin",
      genre: "Programming",
      issued: false,
      issuedTo: null,
    },
    {
      id: 2,
      title: "The Pragmatic Programmer",
      author: "Andy Hunt",
      genre: "Programming",
      issued: true,
      issuedTo: { name: "John Doe", email: "john@example.com" },
    },
    {
      id: 3,
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-Help",
      issued: false,
      issuedTo: null,
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);

  const [currentBook, setCurrentBook] = useState(null);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    issued: false,
    issuedTo: null,
  });
  const [issueDetails, setIssueDetails] = useState({ name: "", email: "" });

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add Book
  const handleAddBook = (e) => {
    e.preventDefault();
    setBooks([...books, { id: Date.now(), ...newBook }]);
    setNewBook({
      title: "",
      author: "",
      genre: "",
      issued: false,
      issuedTo: null,
    });
    setIsAddModalOpen(false);
  };

  // Edit Book
  const handleEditBook = (e) => {
    e.preventDefault();
    setBooks(books.map((b) => (b.id === currentBook.id ? currentBook : b)));
    setCurrentBook(null);
    setIsEditModalOpen(false);
  };

  // Delete Book
  const handleDelete = (id) => setBooks(books.filter((b) => b.id !== id));

  // Open Edit Modal
  const openEditModal = (book) => {
    setCurrentBook({ ...book });
    setIsEditModalOpen(true);
  };

  // Open Issue Modal
  const openIssueModal = (book) => {
    setCurrentBook(book);
    setIssueDetails({ name: "", email: "" });
    setIsIssueModalOpen(true);
  };

  // Issue Book
  const handleIssueBook = (e) => {
    e.preventDefault();
    setBooks(
      books.map((b) =>
        b.id === currentBook.id
          ? { ...b, issued: true, issuedTo: { ...issueDetails } }
          : b
      )
    );
    setCurrentBook(null);
    setIsIssueModalOpen(false);
  };

  // Return Book
  const handleReturn = (id) =>
    setBooks(
      books.map((b) =>
        b.id === id ? { ...b, issued: false, issuedTo: null } : b
      )
    );

  return (
    <div className="p-4">
      {/* Search + Add */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by book name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        />
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Book
        </button>
      </div>

      {/* Desktop Table */}
      <table className="hidden md:table w-full border-collapse border border-slate-300">
        <thead>
          <tr className="bg-slate-200">
            <th className="border p-2">Title</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Genre</th>
            <th className="border p-2">Issue Status</th>
            <th className="border p-2">Issued To</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.id} className="text-center">
              <td className="border p-2">{book.title}</td>
              <td className="border p-2">{book.author}</td>
              <td className="border p-2">{book.genre}</td>
              <td className="border p-2">
                {book.issued ? (
                  <span className="text-red-600 font-semibold">Issued</span>
                ) : (
                  <span className="text-green-600 font-semibold">
                    Available
                  </span>
                )}
              </td>
              <td className="border p-2">
                {book.issued
                  ? `${book.issuedTo.name} (${book.issuedTo.email})`
                  : "-"}
              </td>
              <td className="border p-2 space-x-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => openEditModal(book)}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
                {!book.issued ? (
                  <button
                    onClick={() => openIssueModal(book)}
                    className="bg-purple-500 text-white px-2 py-1 rounded"
                  >
                    Issue
                  </button>
                ) : (
                  <button
                    onClick={() => handleReturn(book.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Return
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="md:hidden grid gap-4">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white p-4 rounded-lg shadow flex flex-col justify-between"
          >
            <div className="mb-2">
              <h3 className="font-semibold text-lg">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author}</p>
              <p className="text-sm text-gray-500">{book.genre}</p>
              <p
                className={`mt-1 text-sm font-semibold ${
                  book.issued ? "text-red-600" : "text-green-600"
                }`}
              >
                {book.issued ? "Issued" : "Available"}
              </p>
              {book.issued && (
                <p className="text-sm text-gray-700">
                  {book.issuedTo.name} ({book.issuedTo.email})
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => openEditModal(book)}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
              {!book.issued ? (
                <button
                  onClick={() => openIssueModal(book)}
                  className="bg-purple-500 text-white px-2 py-1 rounded"
                >
                  Issue
                </button>
              ) : (
                <button
                  onClick={() => handleReturn(book.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Return
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Book Modal */}
      {isAddModalOpen && (
        <Modal title="Add New Book" onClose={() => setIsAddModalOpen(false)}>
          <form onSubmit={handleAddBook} className="space-y-3">
            <input
              type="text"
              placeholder="Title"
              required
              value={newBook.title}
              onChange={(e) =>
                setNewBook({ ...newBook, title: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Author"
              required
              value={newBook.author}
              onChange={(e) =>
                setNewBook({ ...newBook, author: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Genre"
              required
              value={newBook.genre}
              onChange={(e) =>
                setNewBook({ ...newBook, genre: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
            <select
              value={newBook.issued}
              onChange={(e) =>
                setNewBook({ ...newBook, issued: e.target.value === "true" })
              }
              className="w-full border p-2 rounded"
            >
              <option value={false}>Available</option>
              <option value={true}>Issued</option>
            </select>
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Add Book
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Book Modal */}
      {isEditModalOpen && currentBook && (
        <Modal title="Edit Book" onClose={() => setIsEditModalOpen(false)}>
          <form onSubmit={handleEditBook} className="space-y-3">
            <input
              type="text"
              placeholder="Title"
              required
              value={currentBook.title}
              onChange={(e) =>
                setCurrentBook({ ...currentBook, title: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Author"
              required
              value={currentBook.author}
              onChange={(e) =>
                setCurrentBook({ ...currentBook, author: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Genre"
              required
              value={currentBook.genre}
              onChange={(e) =>
                setCurrentBook({ ...currentBook, genre: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Issue Book Modal */}
      {isIssueModalOpen && currentBook && (
        <Modal title="Issue Book" onClose={() => setIsIssueModalOpen(false)}>
          <form onSubmit={handleIssueBook} className="space-y-3">
            <input
              type="text"
              placeholder="User Name"
              required
              value={issueDetails.name}
              onChange={(e) =>
                setIssueDetails({ ...issueDetails, name: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
            <input
              type="email"
              placeholder="User Email"
              required
              value={issueDetails.email}
              onChange={(e) =>
                setIssueDetails({ ...issueDetails, email: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setIsIssueModalOpen(false)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded"
              >
                Issue Book
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

// Reusable Modal Component
const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center p-2">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button onClick={onClose} className="text-gray-600 font-bold">
          X
        </button>
      </div>
      {children}
    </div>
  </div>
);

export default ManageBooks;
