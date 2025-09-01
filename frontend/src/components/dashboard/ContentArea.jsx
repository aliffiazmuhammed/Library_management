import React from "react";
import SearchBooks from "../tabs/SearchBooks";
import AvailableBooks from "../tabs/AvailableBooks";
import IssuedBooks from "../tabs/IssuedBooks";
import ReturnedBooks from "../tabs/ReturnedBooks";

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
    default:
      return <SearchBooks />;
  }
};

export default ContentArea;
