import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the AuthContext
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Current user
  const [loading, setLoading] = useState(true); // Loading state
  const [users, setUsers] = useState([]); // Store all users

  // Derive isLoggedIn from the user state
  const isLoggedIn = !!user; // true if user exists, false otherwise

  // Function to store the user in localStorage
  const storeUserData = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData); // Update the user state
  };

  // Function to update user information
  const updateUser = (updatedUserData) => {
    const updatedUser = {
      ...user,
      ...updatedUserData,
      address: {
        ...user?.address,
        ...updatedUserData?.address,
      },
    };
    setUser(updatedUser); // Update the user state
    localStorage.setItem("user", JSON.stringify(updatedUser)); // Update localStorage
  };

  // Function to authenticate the user using JWT token from localStorage
  const authenticateUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user); // Parse the user data
      setUser(parsedUser); // Update the user state
    } else {
      setUser(null); // Clear the user state
    }
    setLoading(false); // Set loading to false
  };

  // Function to logout the user
  const logOutUser = () => {
    localStorage.removeItem("user"); // Clear localStorage
    authenticateUser(); // Re-check authentication status
  };

  // Fetch users data (replace with your relevant API URL)
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL; // API URL for users data
    axios
      .get(`${apiUrl}/users`)
      .then((response) => {
        setUsers(response.data); // Store users in state
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  // Check for user authentication status on initial load
  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        users, // Providing users data
        loading,
        isLoggedIn, // Provide isLoggedIn
        storeUserData,
        authenticateUser,
        logOutUser,
        updateUser, // Add the updateUser function
      }}
    >
      {children} {/* Render children components */}
    </AuthContext.Provider>
  );
}