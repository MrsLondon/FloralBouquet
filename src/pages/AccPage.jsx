import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import AlertModal from "../components/AlertModal";
import Navbar from "../components/Navbar";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    address: {
      houseNumber: "",
      street: "",
      city: "",
      postalCode: "",
    },
  });
  const navigate = useNavigate();
  const { logOutUser, updateUser } = useContext(AuthContext);

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
      updateUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setAlertMessage("User information updated successfully!");
      setIsAlertModalOpen(true);
    } catch (error) {
      console.error("Error updating user:", error);
      setAlertMessage("Failed to update user information. Please try again later.");
      setIsAlertModalOpen(true);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      try {
        await axios.delete(`https://flowerstore-api-json-server.onrender.com/users/${user.id}`);
        localStorage.removeItem("user");
        updateUser(null);
        navigate("/login");
        alert("Account deleted successfully.");
      } catch (error) {
        console.error("Error deleting account:", error);
        setError("Failed to delete account. Please try again later.");
      }
    }
  };

  const handleViewOrders = () => {
    navigate("/myorder/:orderId");
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4 sm:mb-6">Account Details</h1>

          <AlertModal
            isOpen={isAlertModalOpen}
            onClose={() => setIsAlertModalOpen(false)}
            message={alertMessage}
          />

          {user && (
            <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
              <form onSubmit={handleUpdate}>
                <div className="space-y-3 sm:space-y-4">
                  <input
                    type="text"
                    value={updatedUser.name}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
                    placeholder="Name"
                    className="w-full p-2 border rounded-md text-sm sm:text-base"
                  />
                  <input
                    type="email"
                    value={updatedUser.email}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                    placeholder="Email"
                    className="w-full p-2 border rounded-md text-sm sm:text-base"
                  />
                </div>
                <h2 className="mt-4 text-lg font-bold text-gray-800">Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-2">
                  {Object.keys(updatedUser.address).map((key) => (
                    <input
                      key={key}
                      type="text"
                      value={updatedUser.address[key]}
                      onChange={(e) => setUpdatedUser({
                        ...updatedUser,
                        address: { ...updatedUser.address, [key]: e.target.value },
                      })}
                      placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                      className="p-2 border rounded-md text-sm sm:text-base"
                    />
                  ))}
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full sm:w-auto"
                >
                  Update Information
                </button>
              </form>
            </div>
          )}
          <div className="flex flex-col sm:flex-row justify-between mt-4 space-y-3 sm:space-y-0 sm:space-x-4">
            <button onClick={handleViewOrders} className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 w-full">View Orders</button>
            <button onClick={handleLogout} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 w-full">Logout</button>
            <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 w-full">Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
