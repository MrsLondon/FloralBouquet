import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the AuthContext
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Current user
  const [loading, setLoading] = useState(true); // Loading state
  const [users, setUsers] = useState([]); // Store all users

  // Function to store the user in localStorage
  const storeUserData = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Function to authenticate the user using JWT token from localStorage
  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken"); // Get the stored token
    if (storedToken) {
      // If a token exists, verify it by making a request to your backend
      axios
        .get(`${process.env.REACT_APP_API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        
        .then((response) => {
          // If token is valid, store user data
          setUser(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
          setLoading(false);
          setUser(null);
        });
    } else {
      // If no token exists, set the loading state to false
      setLoading(false);
      setUser(null);
    }
  };

  // Function to logout the user
  const logoutUser = () => {
    localStorage.removeItem("authToken"); // Remove token from localStorage
    localStorage.removeItem("user"); // Remove user data from localStorage
    setUser(null); // Clear the user state
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
        storeUserData,
        authenticateUser,
        logoutUser,
      }}
    >
      {children} {/* Render children components */}
    </AuthContext.Provider>
  );
  

}
