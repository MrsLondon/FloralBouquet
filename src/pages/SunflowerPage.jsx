import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SunflowerPage = () => {
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

  
  const giftFlowers = flowers.filter(flower => flower.type.includes("sunflower"));

  return (
    <div className="min-h-screen p-6 bg-white-100">
    <h1 className="text-center text-3xl font-bold  mb-6">
    <Link to="/Gift-bouquet">Gift Flowers</Link>
    </h1>
    <ul className="flex justify-center gap-6 text-lg font-semibold mb-6">
      <li><Link to="/daisy" className="hover:text-orange-600">Daisy</Link></li>
      <li><Link to="/lavender" className="hover:text-orange-600">Lavender</Link></li>
      <li><Link to="/sunflower" className="hover:text-orange-600">Sunflower</Link></li>
    </ul>
      {giftFlowers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 justify-items-center">
          {giftFlowers.map(flower => (
            <div key={flower.id} 
             className="flex flex-col items-center text-center  p-4 rounded-lg"
            >
              <Link to={`/flower/${flower.id}`}>
                <img 
                  src={flower.imageUrl} 
                  alt={flower.name} 
                  className="w-full max-w-xs h-auto object-contain rounded-lg shadow-md"
                />
              </Link>
              <h3 className="text-2xl font-bold font-[Rosarivo] mt-2">{flower.name}</h3>
              <p className="text-gray-700 mt-2 flex-grow w-70">{flower.description}</p>
              <p className="text-gray-600 font-semibold mt-1">From:€ {flower.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">No gift flowers available.</p>
      )}
    </div>
  );
};

export default SunflowerPage;
