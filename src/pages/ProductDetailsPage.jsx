import { useParams } from "react-router-dom";
import { useState, useContext } from "react"; 
import { FlowerContext } from "../context/FlowerContext"; 
import { Link } from "react-router-dom";

function ProductDetailsPage() {
  const { flowerId } = useParams();
  const { flowers } = useContext(FlowerContext);
  const flower = flowers.find(f => f.id === Number(flowerId));

  if (!flower) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-700 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen p-6 flex justify-center items-center bg-white-100">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
       
        <div>
          <img 
            src={flower.imageUrl} 
            alt={flower.name} 
            className="w-full h-150 object-cover rounded-lg shadow-md"
          />
        </div>

        
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold font-[Rosarivo] text-gray-900">{flower.name}</h1>
          <p className="text-gray-700 mt-4">{flower.description}</p>
          <p className="text-green-600 font-semibold text-3xl mt-4">{flower.price}</p>

          
          <div className="mt-6 flex items-center gap-4">
            <label className="text-gray-700 font-medium">Quantity:</label>
            <input 
              type="number" 
              min="1" 
              defaultValue="1" 
              className="w-16 border border-gray-300 rounded-md p-2 text-center"
            />
          </div>

          <button className="mt-6 bg-sky-800 text-white py-3 px-6 rounded-lg hover:bg-sky-700 transition-all text-lg w-full md:w-auto">
            Add to Cart
          </button>

          
          <p className="text-gray-500 text-sm mt-4">🌿 Free shipping on orders over $50.</p>
          <Link to="/" className="text-gray-500 text-sm mt-2">← Back to home</Link>
        </div>

      </div>
      
    </div>
  );
}

export default ProductDetailsPage;
