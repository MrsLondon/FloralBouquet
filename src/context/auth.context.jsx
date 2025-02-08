import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 
  const [flowers, setFlowers] = useState([]); 
  const [loading, setLoading] = useState(true); 

 
  const storeUserData = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };


  const authenticateUser = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  };

  // Function to logout user and clear storage
  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Fetch flower data from API
  useEffect(() => {
    axios
      .get("https://flowerstore-api-json-server.onrender.com/flowers")
      .then((response) => {
        setFlowers(response.data); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching flowers:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    authenticateUser(); // On initial load, check if user data exists in storage
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        flowers,
        loading,
        storeUserData,
        authenticateUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
