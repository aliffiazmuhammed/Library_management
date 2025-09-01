import React from "react";
import SearchBooks from "../tabs/SearchBooks";
import AvailableBooks from "../tabs/AvailableBooks";
import IssuedBooks from "../tabs/IssuedBooks";
import ReturnedBooks from "../tabs/ReturnedBooks";
import ManageBooks from "../tabs/librarian/ManageBooks";
import AllReturnedBooks from "../tabs/librarian/AllReturnedBooks";
import AllIssuedBooks from "../tabs/librarian/AllIssuedBooks";
import UserManagement from "../tabs/admin/UserManagement";


const ContentArea = ({ activeTab }) => {
  switch (activeTab) {
    case "search":
      return <SearchBooks />;
    case "available":
      return <AvailableBooks />;
    case "issued":
      return <IssuedBooks />;
    case "returned":
      return <ReturnedBooks />;
    case "manage":
      return <ManageBooks />;
    case "allreturned":
      return <AllReturnedBooks />;
    case "allissued":
      return <AllIssuedBooks />;
    case "manageusers":
      return <UserManagement />;
    default:
      return <SearchBooks />;
  }
};

export default ContentArea;
