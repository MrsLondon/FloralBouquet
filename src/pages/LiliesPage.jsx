import { useState, useContext } from "react";
import { FlowerContext } from "../context/FlowerContext"; 
import { Link } from "react-router-dom";
const LiliesPage = () => {

  const {flowers} = useContext(FlowerContext); 

  
  const giftFlowers = flowers.filter(flower => flower.type.includes("lilies"));

  return (
    <div className="min-h-screen p-6 bg-white-100">
      <h1 className="text-3xl font-bold text-center mb-6">Lilies</h1>

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
        <p className="text-center text-gray-600 text-lg">No gift flowers available.</p>
      )}
    </div>
  );
};

export default LiliesPage;
