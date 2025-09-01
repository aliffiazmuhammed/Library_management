import React, { useEffect, useState } from "react";
import axios from "axios";
import { userRoute } from "@/utils/APIRoutes";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all"); // ✅ role filter
  const [selectedUserIssued, setSelectedUserIssued] = useState([]);
  const [selectedUserReturned, setSelectedUserReturned] = useState([]);
  const [activeModal, setActiveModal] = useState(null); // 'issued', 'returned', 'edit'
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "member",
  });

  // ✅ Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(userRoute);
      setUsers(res.data);
      console.log(users)
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const handleViewIssued = async (userId) => {
    try {
      const res = await axios.get(`${userRoute}/${userId}/issued`);
      setSelectedUserIssued(res.data);
      setActiveModal("issued");
    } catch (err) {
      console.error("Error fetching issued books", err);
    }
  };

  const handleViewReturned = async (userId) => {
    try {
      const res = await axios.get(`${userRoute}/${userId}/returned`);
      setSelectedUserReturned(res.data);
      setActiveModal("returned");
    } catch (err) {
      console.error("Error fetching returned books", err);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role || "user",
    });
    setActiveModal("edit");
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`${userRoute}/${editingUser._id}`, editForm);
      fetchUsers(); // refresh
      setEditingUser(null);
      setActiveModal(null);
    } catch (err) {
      console.error("Error updating user", err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${userRoute}/${userId}`);
        fetchUsers(); // refresh
      } catch (err) {
        console.error("Error deleting user", err);
      }
    }
  };

  // ✅ Filtering
  const filteredUsers = users.filter(
    (user) =>
      (user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (roleFilter === "all" || user.role === roleFilter)
  );

  return (
    <div className="p-4">
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/4"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="librarian">Librarian</option>
          <option value="member">Member</option>
        </select>
      </div>

      {/* Desktop Table */}
      <table className="hidden md:table w-full border-collapse border border-slate-300">
        <thead>
          <tr className="bg-slate-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2 capitalize">{user.role || "user"}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEditUser(user)}
                  className="bg-yellow-400 px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleViewIssued(user._id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Issued
                </button>
                <button
                  onClick={() => handleViewReturned(user._id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Returned
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
            key={user._id}
            className="bg-white p-4 rounded-lg shadow flex flex-col gap-2"
          >
            <p className="font-semibold text-lg">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-800 capitalize">
              Role: {user.role || "member"}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleEditUser(user)}
                className="bg-yellow-400 px-3 py-1 rounded flex-1"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteUser(user._id)}
                className="bg-red-500 text-white px-3 py-1 rounded flex-1"
              >
                Delete
              </button>
              <button
                onClick={() => handleViewIssued(user._id)}
                className="bg-blue-500 text-white px-3 py-1 rounded flex-1"
              >
                Issued
              </button>
              <button
                onClick={() => handleViewReturned(user._id)}
                className="bg-green-500 text-white px-3 py-1 rounded flex-1"
              >
                Returned
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
                  <select
                    value={editForm.role}
                    onChange={(e) =>
                      setEditForm({ ...editForm, role: e.target.value })
                    }
                    className="border p-2 rounded w-full"
                  >
                    <option value="admin">Admin</option>
                    <option value="librarian">Librarian</option>
                    <option value="member">Member</option>
                  </select>
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
                    <div
                      key={book.id || book._id}
                      className="p-2 border rounded"
                    >
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
