export const sidebarConfig = {
  admin: [
    { label: "Search Books", key: "search" },
    { label: "Manage Users", key: "manageusers" },
    { label: "Manage Books", key: "manage" },
    { key: "allissued", label: "Issued Books" },
    { key: "allreturned", label: "Returned Books" },
  ],
  librarian: [
    { label: "Search Books", key: "search" },
    { key: "manage", label: "Manage Books" },
    { key: "allissued", label: "Issued Books" },
    { key: "allreturned", label: "Returned Books" },
  ],
  member: [
    { label: "Search Books", key: "search" },
    { label: "Available Books", key: "available" },
    { label: "Issued Books", key: "issued" },
    { label: "Returned Books", key: "returned" },
  ],
};
