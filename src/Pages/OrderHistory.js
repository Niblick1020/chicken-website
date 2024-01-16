// \chicken-website\src\Pages\OrderHistory.js
import React from "react";
import { useAuth } from "../contexts/AuthContext";

function OrderHistory() {
  const { token } = useAuth();

  if (!token) {
    return <p>Please login to view your order history.</p>;
  }
  return (
    <div className="OrderHistory-container">
      <h1>OrderHistory</h1>
      {/* Content of the OrderHistory page */}
    </div>
  );
}

export default OrderHistory;
