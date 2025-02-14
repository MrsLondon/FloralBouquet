import { useState, useContext } from "react";
import { SearchResult } from "./SearchResult";
import { FaSearch } from "react-icons/fa"; 
import { FlowerContext } from "../context/FlowerContext"; 

export const SearchBar = ({ onResultClick }) => {
  const [input, setInput] = useState("");
  const { flowers } = useContext(FlowerContext);
  const [showResults, setShowResults] = useState(true); // State to control visibility of results
  const { setFilteredFlowers } = useContext(FlowerContext);
  const { filteredFlowers } = useContext(FlowerContext);

  const fetchData = (value) => {
    if (!value) {
      setFilteredFlowers([]); // Clear results if input is empty
      return;
    }
    const results = flowers.filter((flower) =>
      flower.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredFlowers(results); // Send filtered results to parent component (if needed)
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const handleResultClick = () => {
    setShowResults(false); // Hide results when a result is clicked
    onResultClick(); // Notify parent component (Navbar) to close the search bar
  };

  const clearInput = () => {
    setInput("");
    setFilteredFlowers([]);
    setShowResults(true);
  };

  return (
    <div>
      {/* Search Input Container */}
      <div className="relative w-full sm:w-34 md:w-49 lg:w-46">

        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search flowers..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white w-full sm:w-64 md:w-80 lg:w-96"
        />
      </div>

      {/* Search Results */}
      {showResults && filteredFlowers.length > 0 && (
        <div className="absolute w-full bg-white border border-gray-300 mt-1 rounded-md shadow-md max-w-md mx-auto">
          {filteredFlowers.map((flower) => (
            <SearchResult
              key={flower.id}
              result={flower}
              onClick={handleResultClick} // Pass the click handler to each result
            />
          ))}
        </div>
      )}

      {/* No Results Found Message */}
      {showResults && filteredFlowers.length === 0 && input && (
        <p className="text-center text-gray-600 mt-2">
          No results found.
        </p>
      )}
    </div>
  );
};