import React, { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import { host } from "@/utils/APIRoutes";

const ReturnedBooks = ({ userId }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const { user } = React.useContext(AuthContext);

  useEffect(() => {
    const uid = user._id; // avoid shadowing
    if (!uid) return;

    const fetchReturnedBooks = async () => {
      try {
        const res = await axios.get(
          `${host}/api/issuance/returnbooks/${uid}?status=returned`
        );
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching returned books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReturnedBooks();
  }, [userId, user._id]);

  // 🔹 Spinner UI
  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-600">Loading returned books...</span>
      </div>
    );

  if (books.length === 0) return <p className="p-4">No returned books yet.</p>;

  const genres = ["All", ...new Set(books.map((b) => b.genre))];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.author &&
        book.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (book.genre &&
        book.genre.toLowerCase().includes(searchTerm.toLowerCase()));

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

      {/* Returned Books Grid */}
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
              <p className="text-xs text-green-600">
                Returned:{" "}
                {book.returnDate ? book.returnDate.split("T")[0] : "-"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReturnedBooks;
