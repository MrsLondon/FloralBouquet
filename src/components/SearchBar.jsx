import { useState, useContext } from "react";
import { FlowerContext } from "../context/FlowerContext"; 
import { SearchResult } from "./SearchResult";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [showResults, setShowResults] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(true);

  const { flowers } = useContext(FlowerContext);

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
