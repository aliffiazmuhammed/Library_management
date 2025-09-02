import React, { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import { host } from "@/utils/APIRoutes";

const IssuedBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const { user } = React.useContext(AuthContext);

  // Fetch active issued books for the specific user
  const userId = user._id;
  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        const res = await axios.get(
          `${host}/api/issuance/issuedbooks/${userId}/issued`
        );
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching issued books:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchIssuedBooks();
  }, [userId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2 text-blue-600">Loading issued books...</span>
      </div>
    );

  if (books.length === 0) return <p className="p-4">No active issued books.</p>;

  // Extract unique genres for filter dropdown
  const genres = ["All", ...new Set(books.map((b) => b.genre))];

  // Filter and search
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre =
      selectedGenre === "All" || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="p-4">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4 items-center">
        <input
          type="text"
          placeholder="Search by title, author or genre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/2"
        />
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/4"
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Issued Books Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        {filteredBooks.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No books found.
          </p>
        ) : (
          filteredBooks.map((book) => (
            <div
              key={book._id}
              className="p-4 border rounded-md shadow-sm bg-white"
            >
              <h3 className="font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-600">Author: {book.author}</p>
              <p className="text-sm text-gray-500">Genre: {book.genre}</p>
              <p className="text-xs text-blue-600">Issued: {book.issueDate}</p>
              <p className="text-xs text-red-600">Due: {book.dueDate}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IssuedBooks;
