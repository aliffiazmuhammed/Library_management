import React, { useState, useEffect } from "react";
import axios from "axios";
import { allBookRoute } from "@/utils/APIRoutes";
import BookCard from "./bookmanage/BookCard";
import BookModal from "./bookmanage/BookModal";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add"); // add, edit, issue
  const [currentBook, setCurrentBook] = useState(null);
const [genreFilter, setGenreFilter] = useState("all");

  // Fetch books from backend
  const fetchBooks = async () => {
    try {
      const res = await axios.get(allBookRoute);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Open modals
  const handleAdd = () => {
    setCurrentBook(null);
    setModalType("add");
    setIsModalOpen(true);
  };
  const handleEdit = (book) => {
    setCurrentBook(book);
    setModalType("edit");
    setIsModalOpen(true);
  };
  const handleIssue = (book) => {
    setCurrentBook(book);
    setModalType("issue");
    setIsModalOpen(true);
  };

  // Delete book
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${allBookRoute}/${id}`);
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  // Return book
  const handleReturn = async (book) => {
    try {
      await axios.put(`${allBookRoute}/return/${book._id}`, {
        ...book,
        status: "available",
      });
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };
  // Filter books by search term and genre
  const filteredBooks = books
    .filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((book) =>
      genreFilter === "all" ? true : book.genre === genreFilter
    );

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Search by book name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        />

        {/* Genre Filter */}
        <select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
        >
          <option value="all">All Genres</option>
          {Array.from(new Set(books.map((b) => b.genre))).map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Book
        </button>
      </div>

      {/* Books grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        {filteredBooks.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            onEdit={() => handleEdit(book)}
            onIssue={() => handleIssue(book)}
            onDelete={() => handleDelete(book._id)}
            onReturn={() => handleReturn(book)}
          />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <BookModal
          type={modalType}
          book={currentBook}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchBooks}
        />
      )}
    </div>
  );
};

export default ManageBooks;
