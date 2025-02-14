import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { FlowerContext } from "../context/FlowerContext";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import the Navbar component

function ProductDetailsPage() {
  const { flowerId } = useParams();
  const { flowers } = useContext(FlowerContext);
  const { addToCart } = useContext(CartContext);
  const flower = flowers.find((f) => f.id === Number(flowerId));

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
    <div className="min-h-screen bg-white-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="p-6 flex justify-center items-center mt-32"> {/* Increased margin-top to mt-32 */}
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Flower Image */}
          <div className="flex justify-center">
            <img
              src={flower.imageUrl}
              alt={flower.name}
              className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Flower Details */}
          <div className="flex flex-col space-y-6">
            <h1 className="text-3xl sm:text-4xl font-bold font-[Rosarivo] text-gray-900">
              {flower.name}
            </h1>
            <p className="text-gray-700 text-base sm:text-lg">
              {flower.description}
            </p>
            <p className="text-green-600 font-semibold text-2xl sm:text-3xl">
              €{flower.price}
            </p>

            {/* Quantity and Add to Cart Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <label className="text-gray-700 font-medium">Quantity:</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-16 border border-gray-300 rounded-md p-2 text-center focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <button
                className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>

            {/* Additional Info */}
            <p className="text-gray-500 text-sm">
              🌿 Free shipping on orders over €25.
            </p>
            <Link
              to="/"
              className="text-gray-500 text-sm hover:text-green-600 transition-all duration-300"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;