import React from "react";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="account-page">
      <h1>Account Details</h1>
      
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AccountPage;