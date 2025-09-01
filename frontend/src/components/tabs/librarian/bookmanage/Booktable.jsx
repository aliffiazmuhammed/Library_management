const BookTable = ({ books, onEdit, onDelete, onToggleStatus }) => (
  <table className="hidden md:table w-full border-collapse border border-slate-300">
    <thead>
      <tr className="bg-slate-200">
        <th className="border p-2">Title</th>
        <th className="border p-2">Author</th>
        <th className="border p-2">Genre</th>
        <th className="border p-2">Publication Date</th>
        <th className="border p-2">Status</th>
        <th className="border p-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {books.map((book) => (
        <tr key={book._id} className="text-center">
          <td className="border p-2">{book.title}</td>
          <td className="border p-2">{book.author}</td>
          <td className="border p-2">{book.genre}</td>
          <td className="border p-2">
            {new Date(book.publicationDate).toLocaleDateString()}
          </td>
          <td className="border p-2">
            <span
              className={
                book.status === "available"
                  ? "text-green-600 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {book.status === "available" ? "Available" : "Issued"}
            </span>
          </td>
          <td className="border p-2 space-x-2">
            <button
              onClick={() => onEdit(book)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(book._id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
            <button
              onClick={() => onToggleStatus(book)}
              className="bg-purple-500 text-white px-2 py-1 rounded"
            >
              {book.status === "available" ? "Issue" : "Return"}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default BookTable;
