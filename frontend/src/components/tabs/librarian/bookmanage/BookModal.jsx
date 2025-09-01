import React, { useState } from "react";
import axios from "axios";
import { allBookRoute } from "@/utils/APIRoutes";

const BookModal = ({ type, book, onClose, onSuccess }) => {
  const [formData, setFormData] = useState(
    book || {
      title: "",
      author: "",
      genre: "",
      publicationDate: "",
      status: "available",
    }
  );
  const [issueDetails, setIssueDetails] = useState({ name: "", email: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === "add") {
        // Add new book
        await axios.post(allBookRoute, formData);
      } else if (type === "edit") {
        // Update book details
        await axios.put(`${allBookRoute}/${book._id}`, formData);
      } else if (type === "issue") {
        // Get user by email
        console.log(issueDetails.email);
        // const userRes = await axios.get(
        //   `/api/users?email=${issueDetails.email}`
        // );
        // if (!userRes.data || !userRes.data._id) {
        //   alert("User not found");
        //   return;
        // }

        // Issue book
        await axios.put(`${allBookRoute}/issue/${book._id}`, {
          email: issueDetails.email,
        });
      }

      onSuccess(); // refresh parent data
      onClose(); // close modal
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };


  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center p-2">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {type === "add"
              ? "Add Book"
              : type === "edit"
              ? "Edit Book"
              : "Issue Book"}
          </h2>
          <button onClick={onClose} className="text-gray-600 font-bold">
            X
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {(type === "add" || type === "edit") && (
            <>
              <input
                type="text"
                placeholder="Title"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Author"
                required
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Genre"
                required
                value={formData.genre}
                onChange={(e) =>
                  setFormData({ ...formData, genre: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <input
                type="date"
                placeholder="Publication Date"
                required
                value={
                  formData.publicationDate
                    ? new Date(formData.publicationDate)
                        .toISOString()
                        .substr(0, 10)
                    : ""
                }
                onChange={(e) =>
                  setFormData({ ...formData, publicationDate: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
            </>
          )}

          {type === "issue" && (
            <>
              <p className="text-gray-700">Enter user details for issuing:</p>
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
            </>
          )}

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded ${
                type === "add"
                  ? "bg-green-600"
                  : type === "edit"
                  ? "bg-blue-600"
                  : "bg-purple-600"
              } text-white`}
            >
              {type === "add"
                ? "Add Book"
                : type === "edit"
                ? "Update Book"
                : "Issue Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookModal;
