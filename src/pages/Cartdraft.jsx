import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b py-4">
            <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600">Quantity: {item.quantity}</p>
            <p className="text-green-600 font-semibold">€{(item.quantity * item.price).toFixed(2)}</p>
            <button
              className="text-red-500 font-bold"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
