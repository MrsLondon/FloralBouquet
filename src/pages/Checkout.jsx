import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link,  useNavigate } from "react-router-dom";

function CheckoutPage() {
  const { cartItems, cartSum, cartQuantity, clearCart } = useContext(CartContext);
  const navigate =  useNavigate();

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleCheckout = async (e) => {
    e.preventDefault();

    const items = cartItems.map((item) => ({
      productId: item.id,
      name: item.name,
      quantity: item.quantity,
      price: `€${item.price}`,
    }));

    const orderData = {
      userId: 1,
      orderDate: new Date().toISOString(),
      items,
      totalPrice: `€${cartSum}`,
      shippingAddress: {
        fullName,
        address,
        city,
        zipCode,
      },
      paymentStatus: "paid",
    };
  console.log(orderData);
    try {
      const response = await fetch('https://flowerstore-api-json-server.onrender.com/orders', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) {
        throw new Error("Failed to place the order");
      }

     
      const responseData = await response.json();
      console.log("Order placed successfully:", responseData);

     
      clearCart();
      alert("Thank you for your purchase!");

 
      navigate(`/myorder/${responseData.id}`); // Pass the order ID in the URL

    } catch (error) {
 
      console.error("Error placing order:", error);
      alert("There was an error processing your order. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div>
                    <h3 className="text-md font-semibold">{item.name}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-black-600 font-semibold">€{(item.quantity * item.price).toFixed(2)}</p>
                  </div>
                </div>
              ))}
              <div className="border-t pt-4">
                <p className="text-lg font-semibold">Total Items: {cartQuantity}</p>
                <p className="text-lg font-semibold text-green-600">Total: €{cartSum.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping & Payment Information</h2>
          <form onSubmit={handleCheckout} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Zip Code</label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
                <input
                  type="text"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">CVV</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
