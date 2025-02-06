import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create a context for flowers
export const FlowerContext = createContext();

export const FlowerProvider = ({ children }) => {
  const [flowers, setFlowers] = useState([]);
  const [filteredFlowers, setFilteredFlowers] = useState([]);
 
  useEffect(() => {
    axios
      .get("https://flowerstore-api-json-server.onrender.com/flowers")
      .then((response) => setFlowers(response.data))
      .catch((error) => console.error("There was an error!", error));
  }, []);


  return (
    <FlowerContext.Provider
      value={{ flowers, filteredFlowers, setFilteredFlowers }}
    >
      {children}
    </FlowerContext.Provider>
  );
};

