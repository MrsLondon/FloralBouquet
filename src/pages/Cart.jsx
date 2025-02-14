import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../context/SearchContext'; // Import the useSearch hook

function Card() {
  const [flowers, setFlowers] = useState([]);
  const { filteredFlowers } = useSearch(); // Use filteredFlowers from SearchContext

  useEffect(() => {
    axios.get('https://flowerstore-api-json-server.onrender.com/flowers')
      .then(response => {
        setFlowers(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const results = filteredFlowers.length > 0 ? filteredFlowers : flowers;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 justify-items-center pt-20">
      {results.map(flower => (
        <div 
          key={flower.id} 
          className="flex flex-col items-center text-center  p-4 rounded-lg"
        >
          <Link to={`/flower/${flower.id}`}>
            <img 
              src={flower.imageUrl} 
              alt={flower.name} 
              className="w-full max-w-xs h-auto object-contain rounded-lg shadow-md"
            />
          </Link>
          <h3 className="text-2xl font-bold font-[Rosarivo] mt-2 ">{flower.name}</h3>
          <p className="text-gray-700 mt-2 w-70">{flower.description}</p>
          <p className="text-gray-600 font-semibold mt-1">From: €{flower.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Card;