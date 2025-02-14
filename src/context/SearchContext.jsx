import { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredFlowers, setFilteredFlowers] = useState([]);
  const [showResults, setShowResults] = useState(true);

  return (
    <SearchContext.Provider
      value={{
        searchInput,
        setSearchInput,
        filteredFlowers,
        setFilteredFlowers,
        showResults,
        setShowResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);