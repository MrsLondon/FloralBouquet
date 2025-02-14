import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/auth.context"; // Import AuthContext
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import the Navbar component

function CheckoutPage() {
  const { cartItems, cartSum, cartQuantity, clearCart } = useContext(CartContext);
  const { user, updateUser } = useContext(AuthContext); // Use AuthContext
  const navigate = useNavigate();

  // Pre-fill shipping information with user's account details
  const [fullName, setFullName] = useState(user?.name || "");
  const [address, setAddress] = useState(user?.address?.street || "");
  const [houseNumber, setHouseNumber] = useState(user?.address?.houseNumber || ""); // Add house number
  const [city, setCity] = useState(user?.address?.city || "");
  const [zipCode, setZipCode] = useState(user?.address?.postalCode || ""); // Fix typo
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [email, setEmail] = useState(user?.email || "");

  const handleCheckout = async (e) => {
    e.preventDefault();

    const items = cartItems.map((item) => ({
      productId: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    const orderData = {
      userId: user?.id, // Use the user's ID from AuthContext
      email,
      orderDate: new Date().toISOString(),
      items,
      totalPrice: `${cartSum}`,
      shippingAddress: {
        fullName,
        address,
        houseNumber, // Include house number
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

      // Update user's address in AuthContext and localStorage
      updateUser({
        ...user,
        address: {
          street: address,
          houseNumber, // Sync house number
          city,
          postalCode: zipCode,
        },
      });

      clearCart();
      navigate(`/myorder/${responseData.id}`);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an error processing your order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto p-6 mt-20">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-8 rounded-lg shadow-md">
          {/* Order Summary Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center">Your cart is empty.</p>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-lg font-semibold text-green-600">
                        €{(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-6">
                  <p className="text-xl font-semibold text-gray-800">Total Items: {cartQuantity}</p>
                  <p className="text-2xl font-bold text-green-600 mt-2">
                    Total: €{cartSum.toFixed(2)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Shipping & Payment Information Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Shipping & Payment Information
            </h2>
            <form onSubmit={handleCheckout} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">House Number</label>
                <input
                  type="text"
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;