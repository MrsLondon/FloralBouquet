import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create a context for flowers
export const FlowerContext = createContext();

// Create a provider component
export const FlowerProvider = ({ children }) => {
  const [flowers, setFlowers] = useState([]);

  // Fetch flowers data on component mount
  useEffect(() => {
    axios
      .get("https://flowerstore-api-json-server.onrender.com/flowers")
      .then((response) => setFlowers(response.data))
      .catch((error) => console.error("There was an error!", error));
  }, []);

  // Provide the flowers data to all children components
  return (
    <FlowerContext.Provider value={{ flowers }}>
      {children}
    </FlowerContext.Provider>
  );
};