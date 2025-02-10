import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const [user, setUser] = useState(null); 
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      setError("Please log in to view your account details.");
      navigate("/login"); 
    }
  }, [navigate]);

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://flowerstore-api-json-server.onrender.com/users"
        );
        setUsers(response.data); 
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users. Please try again later.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  
  const handleLogout = () => {
    localStorage.removeItem("user"); 
    navigate("/login"); 
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="account-page">
      <h1>Account Details</h1>
      {user && (
        <div className="user-details">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <h2>Address</h2>
          <p>
            <strong>House Number:</strong> {user.address.houseNumber}
          </p>
          <p>
            <strong>Street:</strong> {user.address.street}
          </p>
          <p>
            <strong>City:</strong> {user.address.city}
          </p>
          <p>
            <strong>Postal Code:</strong> {user.address.postalCode}
          </p>
        </div>
      )}

      

      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default AccountPage;