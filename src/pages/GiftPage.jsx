import { useState, useEffect, useContext } from "react"; 
import { FlowerContext } from "../context/FlowerContext"; // Make sure the path is correct
import { Link } from "react-router-dom";


const GiftPage = () => {
  // Access the flowers data from the context
  const { flowers } = useContext(FlowerContext);

  // Filter flowers for gifts
  const giftFlowers = flowers.filter((flower) =>
    flower.category.includes("gift")
  );

  return (
    <div className="min-h-screen p-6 bg-white-100">
      <h1 className="text-3xl font-bold text-center mb-6">Gift Flowers</h1>

      
      <ul className="flex justify-center gap-6 text-lg font-semibold mb-6">
        <li><Link to="/lilies" className="hover:text-orange-600">Lilies</Link></li>
        <li><Link to="/lavender" className="hover:text-orange-600">Lavender</Link></li>
      </ul>

     
      {giftFlowers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-4 justify-items-center ">
          {giftFlowers.map(flower => (
            <div key={flower.id} className="flex flex-col items-center text-center  p-4 rounded-lg"
           
            >
              <Link to={`/flower/${flower.id}`}>
                <img src={flower.imageUrl} alt={flower.name} 
                className="w-full max-w-xs h-auto object-contain rounded-lg shadow-md" />
              </Link>
              <h3 className="text-2xl font-bold mt-2">{flower.name}</h3>
              <p className="text-gray-700 mt-2 w-70">{flower.description}</p>
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

export default GiftPage;
