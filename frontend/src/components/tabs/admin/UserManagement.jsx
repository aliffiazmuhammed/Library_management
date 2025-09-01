import React, { useState } from "react";

// Dummy user data
const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Alice Green", email: "alice@example.com" },
];

// Dummy issued/returned books
const issuedBooks = [
  {
    id: 1,
    title: "Clean Code",
    issuedToId: 1,
    issueDate: "2025-08-01",
    dueDate: "2025-08-15",
  },
  {
    id: 2,
    title: "Atomic Habits",
    issuedToId: 2,
    issueDate: "2025-08-03",
    dueDate: "2025-08-17",
  },
];

const returnedBooks = [
  {
    id: 3,
    title: "The Pragmatic Programmer",
    issuedToId: 1,
    issueDate: "2025-07-15",
    returnDate: "2025-07-29",
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserIssued, setSelectedUserIssued] = useState([]);
  const [selectedUserReturned, setSelectedUserReturned] = useState([]);
  const [activeModal, setActiveModal] = useState(null); // 'issued', 'returned', 'edit'
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "" });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewIssued = (userId) => {
    const books = issuedBooks.filter((b) => b.issuedToId === userId);
    setSelectedUserIssued(books);
    setActiveModal("issued");
  };

  const handleViewReturned = (userId) => {
    const books = returnedBooks.filter((b) => b.issuedToId === userId);
    setSelectedUserReturned(books);
    setActiveModal("returned");
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditForm({ name: user.name, email: user.email });
    setActiveModal("edit");
  };

  const handleUpdateUser = () => {
    setUsers(
      users.map((u) => (u.id === editingUser.id ? { ...u, ...editForm } : u))
    );
    setEditingUser(null);
    setActiveModal(null);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== userId));
    }
  };

  return (
    <div className="p-4">
      {/* Search Users */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        />
      </div>

      {/* Desktop Table */}
      <table className="hidden md:table w-full border-collapse border border-slate-300">
        <thead>
          <tr className="bg-slate-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEditUser(user)}
                  className="bg-yellow-400 px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleViewIssued(user.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Issued Books
                </button>
                <button
                  onClick={() => handleViewReturned(user.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Returned Books
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="md:hidden grid gap-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded-lg shadow flex flex-col gap-2"
          >
            <p className="font-semibold text-lg">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleEditUser(user)}
                className="bg-yellow-400 px-3 py-1 rounded flex-1"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded flex-1"
              >
                Delete
              </button>
              <button
                onClick={() => handleViewIssued(user.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded flex-1"
              >
                Issued Books
              </button>
              <button
                onClick={() => handleViewReturned(user.id)}
                className="bg-green-500 text-white px-3 py-1 rounded flex-1"
              >
                Returned Books
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center p-2">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            {/* Edit User Modal */}
            {activeModal === "edit" && editingUser && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Edit User</h2>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="text-gray-600 font-bold"
                  >
                    X
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Name"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="border p-2 rounded w-full"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                    className="border p-2 rounded w-full"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setActiveModal(null)}
                      className="px-3 py-1 rounded border"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateUser}
                      className="px-3 py-1 rounded bg-blue-500 text-white"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Issued/Returned Books Modal */}
            {(activeModal === "issued" || activeModal === "returned") && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    {activeModal === "issued"
                      ? "Issued Books"
                      : "Returned Books"}
                  </h2>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="text-gray-600 font-bold"
                  >
                    X
                  </button>
                </div>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {(activeModal === "issued"
                    ? selectedUserIssued
                    : selectedUserReturned
                  ).map((book) => (
                    <div key={book.id} className="p-2 border rounded">
                      <p className="font-medium">{book.title}</p>
                      <p className="text-sm text-gray-600">
                        Issue Date: {book.issueDate}
                      </p>
                      {activeModal === "issued" ? (
                        <p className="text-sm text-gray-600">
                          Due Date: {book.dueDate}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-600">
                          Return Date: {book.returnDate}
                        </p>
                      )}
                    </div>
                  ))}
                  {(activeModal === "issued"
                    ? selectedUserIssued
                    : selectedUserReturned
                  ).length === 0 && (
                    <p className="text-center text-gray-500">No books found.</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
