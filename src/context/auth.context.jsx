import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the AuthContext
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Current user
  const [loading, setLoading] = useState(true); // Loading state
  const [users, setUsers] = useState([]); // Store all users
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to store the user in localStorage
  const storeUserData = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Function to authenticate the user using JWT token from localStorage
  const authenticateUser = () => { 
    const user = localStorage.getItem('user');
    
    if (user) {  // If user exists in the localStorage
        const parsedUser = JSON.parse(user) // {"email" : "lloyd@test.com"} --> {email: "lloyd@test.com"}
       // Update state variables        
        setIsLoggedIn(true);
        setLoading(false);
        setUser(parsedUser);        
      }
  
     else {
      // If user is not available (or is removed)
        setIsLoggedIn(false);
        setLoading(false);
        setUser(null);      
    }   
  }
  // Function to logout the user
  const removeUser = () => {                
    localStorage.removeItem("user");
  }
 
  const logOutUser = () => {                
    removeUser(); // clear localStorage
    authenticateUser(); // update state variables accordingly
  } 

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
        logOutUser,
        isLoggedIn
      }}
    >
      {children} {/* Render children components */}
    </AuthContext.Provider>
  );
  

}
