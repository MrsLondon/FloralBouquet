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
        const { data } = await axios.get("https://flowerstore-api-json-server.onrender.com/users");
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Account Details</h1>
      {user && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-lg font-semibold text-gray-700">{user.name}</p>
          <p className="text-gray-600">{user.email}</p>
          <h2 className="mt-4 text-xl font-bold text-gray-800">Address</h2>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <p className="text-gray-700"><strong>House Number:</strong> {user.address.houseNumber}</p>
            <p className="text-gray-700"><strong>Street:</strong> {user.address.street}</p>
            <p className="text-gray-700"><strong>City:</strong> {user.address.city}</p>
            <p className="text-gray-700"><strong>Postal Code:</strong> {user.address.postalCode}</p>
          </div>
        </div>
      )}
      <button onClick={handleLogout} className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300">
        Logout
      </button>
    </div>
  );
};

export default AccountPage;
