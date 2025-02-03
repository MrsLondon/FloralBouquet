import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const WeddingPage = () => {
  const [flowers, setFlowers] = useState([]); 

  useEffect(() => {
    axios.get("https://flowerstore-api-json-server.onrender.com/flowers")
      .then(response => {
        setFlowers(response.data);
      })
      .catch(error => {
        console.error("There was an error!", error);
      });
  }, []);

  
  const giftFlowers = flowers.filter(flower => flower.category.includes("wedding"));

  return (
    <div className="min-h-screen p-6 bg-white-100">
      <h1 className="text-3xl font-bold text-center mb-6">Wedding</h1>

      {/* Subcategory Navigation */}
      <ul className="flex justify-center gap-6 text-lg font-semibold mb-6">
      <li>
          <Link to="/daisy" className="hover:text-orange-600">Daisy</Link>
          </li>
          <li>
          <Link to="/sunflower" className="hover:text-orange-600">Sunflower</Link>
          </li>
      </ul>

      {giftFlowers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {giftFlowers.map(flower => (
            <div key={flower.id} 
            // className="bg-white shadow-lg p-4 rounded-lg flex flex-col h-full"
            >
              <Link to={`/flower/${flower.id}`}>
                <img 
                  src={flower.imageUrl} 
                  alt={flower.name} 
                  className="h-120 w-full object-cover rounded-lg"
                />
              </Link>
              <h3 className="text-2xl font-bold font-[Rosarivo] mt-2">{flower.name}</h3>
              <p className="text-gray-700 mt-2 flex-grow">{flower.description}</p>
              <p className="text-gray-600 font-semibold mt-1">From: {flower.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">No wedding flowers available.</p>
      )}
    </div>
  );
};

export default WeddingPage;
