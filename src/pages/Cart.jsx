import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate} from "react-router-dom"; // Import Link for navigation


function Cart({ isOpen, onClose }) {
  const { cartItems, removeFromCart, cartSum, cartQuantity } = useContext(CartContext);
  const [total, setTotal] = useState(cartSum);
  const navigate = useNavigate();
  useEffect(() => {
    setTotal(cartSum);
  }, [cartSum]);
  
  const handleCheckout = () => {
    onClose();
    
    navigate("/checkout"); 
  };



  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={onClose}></div>}

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button className="absolute top-4 right-4 text-gray-600 text-xl" onClick={onClose}>
          ✕
        </button>

        <h2 className="text-xl font-bold p-4 border-b">Shopping Cart</h2>

        <div className="p-4 overflow-y-auto h-[calc(100%-200px)]">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b py-4">
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                <div>
                  <h3 className="text-md w-16 font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-black-600 font-semibold">€{(item.quantity * item.price).toFixed(2)}</p>
                </div>
                <button className="text-red-500 font-bold" onClick={() => removeFromCart(item.id)}>
                  -
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t absolute bottom-0 w-full bg-white">
          <p className="text-lg font-semibold">Total Items: {cartQuantity}</p>
          <p className="text-lg font-semibold text-green-600">Total: €{total.toFixed(2)}</p>
          <Link to="/checkout">
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 mt-4"  onClick={handleCheckout}>
              Check out
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Cart;