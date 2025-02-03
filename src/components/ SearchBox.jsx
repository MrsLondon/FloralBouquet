/*import { useState } from "react";

function SearchBox({ onSearch }) {
  const [searchStr, setSearchStr] = useState("");

  const handleChange = (event) => {
    setSearchStr(event.target.value);
    onSearch(event.target.value); // Pass input to the parent
  };

  return (
    <div className="bg-white shadow-md rounded py-2 px-3 w-80">
      <input
        type="text"
        placeholder="Search flowers..."
        value={searchStr}
        onChange={handleChange}
        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
}

export default SearchBox;
