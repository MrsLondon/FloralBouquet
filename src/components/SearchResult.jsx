import { Link } from "react-router-dom";

export const SearchResult = ({ result, onClick }) => {
  return (
    <Link to={`/flower/${result.id}`} className="block" onClick={onClick}>
      <div className="p-2 bg-white border-b border-gray-200 hover:bg-orange-100 cursor-pointer transition-all">
        <h3 className="text-lg font-semibold">{result.name}</h3>
      </div>
    </Link>
  );
};