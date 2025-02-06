import { useState, useContext } from "react"; 
import { FlowerContext } from "../context/FlowerContext"; 
import { Link } from "react-router-dom";


const ValentinePage = () => {
  const { flowers } = useContext(FlowerContext);

  
  const giftFlowers = flowers.filter(flower => flower.category.includes("valentine"));

  return (
    <div className="min-h-screen p-6 bg-white-100">
      <h1 className="text-3xl font-bold text-center mb-6">Valentine's Day</h1>

    
     <ul className="flex justify-center gap-6 text-lg font-semibold mb-6">
      <li>
          <Link to="/roses" className="hover:text-orange-600">Roses</Link>
          </li>
        <li><Link to="/peony" className="hover:text-orange-600">Peony</Link></li>
        <li><Link to="/tulips" className="hover:text-orange-600">Tulips</Link></li>
      </ul>

      {giftFlowers.length > 0 ? (
        <div className= "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 justify-items-center ">
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
              <p className="text-gray-600 font-semibold mt-1">From: {flower.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">No gift flowers available.</p>
      )}
    </div>
  );
};

export default ValentinePage;
