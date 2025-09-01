import React, { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

const ReturnedBooks = ({ userId }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
const { user } = React.useContext(AuthContext);
  // Fetch returned books for the specific user
  useEffect(() => {
    const userId = user._id
    console.log(userId)
    if (!userId) return;

    const fetchReturnedBooks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/issuance/returnbooks/${userId}?status=returned`
        );
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching returned books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReturnedBooks();
  }, [userId]);

  if (loading) return <p className="p-4">Loading returned books...</p>;
  if (books.length === 0) return <p className="p-4">No returned books yet.</p>;

  // Extract unique genres for filter dropdown
  const genres = ["All", ...new Set(books.map((b) => b.genre))];

  // Filter and search
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
