import { useState, useEffect } from "react";
import axios from "axios";
import { SearchResult } from "./SearchResult";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [flowers, setFlowers] = useState([]);
  const [showResults, setShowResults] = useState(true);  // State to control visibility of results
  const [showSearchBar, setShowSearchBar] = useState(true);  // State to control visibility of search bar

  useEffect(() => {
    axios.get("https://flowerstore-api-json-server.onrender.com/flowers")
      .then(response => setFlowers(response.data))
      .catch(error => console.error("There was an error!", error));
  }, []);

  const fetchData = (value) => {
    const results = flowers.filter((flower) =>
      flower.name.toLowerCase().includes(value.toLowerCase())
    );
    setResults(results);
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const handleResultClick = () => {
    setShowResults(false);  // Hide results when a result is clicked
    setShowSearchBar(false); // Hide search box when a result is clicked
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Hide the search bar if showSearchBar is false */}
      {showSearchBar && (
        <input
          type="text"
          placeholder="Search flowers..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
        />
      )}

      {/* Display search results only if showResults is true */}
      {showResults && (
        <div className="absolute w-full bg-white border border-gray-300 mt-1 rounded-md shadow-md">
          {flowers
            .filter(flower =>
              flower.name.toLowerCase().includes(input.toLowerCase())
            )
            .map((flower) => (
              <SearchResult
                key={flower.id}
                result={flower}
                onClick={handleResultClick} // Pass the click handler to each result
              />
            ))}
        </div>
      )}
    </div>
  );
};
