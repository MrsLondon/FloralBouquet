import { useParams } from "react-router-dom";
import { useState, useContext } from "react"; 
import { FlowerContext } from "../context/FlowerContext"; 
import { CartContext } from "../context/CartContext"; // Import the CartContext
import { Link } from "react-router-dom";

function ProductDetailsPage() {
  const { flowerId } = useParams();
  const { flowers } = useContext(FlowerContext);
  const { addToCart } = useContext(CartContext); // Get addToCart from CartContext
  const flower = flowers.find(f => f.id === Number(flowerId));

  const [quantity, setQuantity] = useState(1); // Track the quantity

  if (!flower) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-700 text-lg">Loading...</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(flower, quantity); // Add the flower with the selected quantity to the cart
  };

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
          <p className="text-green-600 font-semibold text-3xl mt-4">€{flower.price}</p>

          <div className="flex flex-row items-center gap-4 mt-6">
           <div className="mt-6 flex items-center gap-4 ">
            <label className="text-gray-700 font-medium">Quantity:</label>
            <input 
              type="number" 
              min="1" 
              value={quantity} 
              onChange={(e) => setQuantity(Number(e.target.value))} // Update quantity
              className="w-16 border border-gray-300 rounded-md p-2 text-center"
            />
          </div>

          <button
            className="mt-6 bg-800 text-black py-3 px-6 rounded-lg hover:bg-sky-700 transition-all text-xs w-full w-16 border-2 border-gray-300 "
            onClick={handleAddToCart} // Trigger addToCart on click
          >
            Add to Cart
          </button> 
          </div>

          

          <p className="text-gray-500 text-sm mt-4">🌿 Free shipping on orders over €25.</p>
          <Link to="/" className="text-gray-500 text-sm mt-2">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
