import { useState, useContext } from "react";
import { SearchResult } from "./SearchResult";
import { FaSearch } from "react-icons/fa"; 
import { FlowerContext } from "../context/FlowerContext"; 

export const SearchBar = () => {
  const [input, setInput] = useState("");
  const { flowers } = useContext(FlowerContext);
  const [showResults, setShowResults] = useState(true); // State to control visibility of results
  const [showSearchBar, setShowSearchBar] = useState(true); // State to control visibility of search bar
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
    if (!value) {
      setFilteredFlowers([]); // Clear results if input is empty
      return;
    }
    setInput(value);
    fetchData(value);
  };

  const handleResultClick = () => {
    setShowResults(false); // Hide results when a result is clicked
    setShowSearchBar(false); // Hide search box when a result is clicked
  };

  const clearInput = () => {
    setInput("");
    setFilteredFlowers([]);
    setResults([]);
    setShowResults(true);
    setShowSearchBar(true);
  };

  return (
    <div>
      {/* Hide the search bar if showSearchBar is false */}
      <div className="relative w-full max-w-md mx-auto">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search flowers..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          className=" pl-10 pr-8 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none bg-red w-full sm:w-72"
        />
        {input && (
          <button
            onClick={clearInput}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          >
            &#x2715;
          </button>
        )}
      </div>

      {/* Display search results only if showResults is true */}

      {/* 
      {showResults && filteredResults.length > 0 && (
        <div className="absolute w-full bg-white border border-gray-300 mt-1 rounded-md shadow-md">
          {filteredResults.map((flower) => (
            <SearchResult
              key={flower.id}
              result={flower}
              onClick={handleResultClick} // Pass the click handler to each result
            />
          ))}
        </div>
      )} */}

      {showResults && filteredFlowers.length === 0 && input && (
         <p>
         No results found.
         
       </p>
      )}
    </div>
  );
};