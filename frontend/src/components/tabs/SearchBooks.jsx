import React, { useState, useEffect } from "react";
import { allBookRoute } from "@/utils/APIRoutes";
import axios from "axios";

const SearchBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 Loading state

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true); // Start loading
        const res = await axios.get(allBookRoute);
        setBooks(res.data);

        // Extract unique genres dynamically
        const uniqueGenres = [
          "all",
          ...new Set(res.data.map((book) => book.genre.toLowerCase())),
        ];
        setGenres(uniqueGenres);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchBooks();
  }, []);

  // Filter books by search term (title or author)
  let filteredBooks = books.filter((book) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower)
    );
  });

  // Filter books by genre
  if (genreFilter !== "all") {
    filteredBooks = filteredBooks.filter(
      (book) => book.genre.toLowerCase() === genreFilter.toLowerCase()
    );
  }

  return (
    <div className="p-4">
      {/* Search and genre filter */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border p-2 rounded-md"
        />

        {/* Genre Filter Dropdown */}
        <select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          className="border p-2 rounded-md min-w-[150px]"
        >
          {genres.map((g, idx) => (
            <option key={idx} value={g}>
              {g === "all"
                ? "All Genres"
                : g.charAt(0).toUpperCase() + g.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div
                key={book._id}
                className="p-4 border rounded-md shadow-sm bg-white"
              >
                <h3 className="font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-600">Author: {book.author}</p>
                <p className="text-sm text-gray-500">Genre: {book.genre}</p>
                <p
                  className={`text-sm font-medium ${
                    book.status.toLowerCase() === "available"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {book.status}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No books found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBooks;
