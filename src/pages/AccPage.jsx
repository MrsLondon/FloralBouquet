import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    address: {
      houseNumber: "",
      street: "",
      city: "",
      postalCode: ""
    }
  });
  const navigate = useNavigate();
  const { logOutUser, updateUser } = useContext(AuthContext); // Destructure updateUser from AuthContext

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setUpdatedUser(storedUser);
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
    logOutUser(); 
    navigate("/login");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://flowerstore-api-json-server.onrender.com/users/${user.id}`,
        updatedUser
      );
      updateUser(response.data); // Use updateUser here
      localStorage.setItem("user", JSON.stringify(response.data));
      alert("User information updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user information. Please try again later.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      try {
        await axios.delete(`https://flowerstore-api-json-server.onrender.com/users/${user.id}`);
        localStorage.removeItem("user");
        updateUser(null); // Clear the global user context
        navigate("/login");
        alert("Account deleted successfully.");
      } catch (error) {
        console.error("Error deleting account:", error);
        setError("Failed to delete account. Please try again later.");
      }
    }
  };

  const handleViewOrders = () => {
    navigate("/myorder/:orderId"); // Navigate to the MyOrders page
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Account Details</h1>
      {user && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <form onSubmit={handleUpdate}>
            <p className="text-lg font-semibold text-gray-700">Name</p>
            <input
              type="text"
              value={updatedUser.name}
              onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
              className="w-full p-2 mt-2 border rounded-md"
            />
            <p className="text-lg font-semibold text-gray-700 mt-4">Email</p>
            <input
              type="email"
              value={updatedUser.email}
              onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
              className="w-full p-2 mt-2 border rounded-md"
            />
            <h2 className="mt-4 text-xl font-bold text-gray-800">Address</h2>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <input
                type="text"
                value={updatedUser.address.houseNumber}
                onChange={(e) => setUpdatedUser({ ...updatedUser, address: { ...updatedUser.address, houseNumber: e.target.value } })}
                placeholder="House Number"
                className="p-2 border rounded-md"
              />
              <input
                type="text"
                value={updatedUser.address.street}
                onChange={(e) => setUpdatedUser({ ...updatedUser, address: { ...updatedUser.address, street: e.target.value } })}
                placeholder="Street"
                className="p-2 border rounded-md"
              />
              <input
                type="text"
                value={updatedUser.address.city}
                onChange={(e) => setUpdatedUser({ ...updatedUser, address: { ...updatedUser.address, city: e.target.value } })}
                placeholder="City"
                className="p-2 border rounded-md"
              />
              <input
                type="text"
                value={updatedUser.address.postalCode}
                onChange={(e) => setUpdatedUser({ ...updatedUser, address: { ...updatedUser.address, postalCode: e.target.value } })}
                placeholder="Postal Code"
                className="p-2 border rounded-md"
              />
            </div>
            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
              >
                Update Information
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 w-full"
              >
                Delete Account
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleViewOrders}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 w-full"
        >
          View Orders
        </button>
        <button
          onClick={handleLogout}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300 w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccountPage;