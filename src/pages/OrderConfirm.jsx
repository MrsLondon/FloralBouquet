// In OrderConfirm
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useParams, useNavigate } from "react-router-dom";

function OrderConfirm() {
  const { cartItems, cartSum, cartQuantity, clearCart } = useContext(CartContext);
  const { orderId } = useParams(); // Get order ID from URL
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`https://flowerstore-api-json-server.onrender.com/orders/${orderId}`);
        if (!response.ok) throw new Error("Failed to fetch the order");

        const orderData = await response.json();
        setOrder(orderData);
      } catch (error) {
        console.error("Error fetching order:", error);
        alert("Failed to fetch order details. Please try again.");
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleUpdateOrder = async () => {
    const updatedOrderData = {
      ...order,
      // Modify the order as per user input or business logic
    };

    try {
      const response = await fetch(
        `https://flowerstore-api-json-server.onrender.com/orders/${order.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedOrderData),
        }
      );

      if (!response.ok) throw new Error("Failed to update the order");
      const updatedOrder = await response.json();
      setOrder(updatedOrder);
      alert("Order updated successfully.");
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update the order. Please try again.");
    }
  };

  const handleCancelOrder = async () => {
    try {
      const response = await fetch(
        `https://flowerstore-api-json-server.onrender.com/orders/${order.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to cancel the order");
      clearCart();
      navigate("/cancel");
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("Failed to cancel the order. Please try again.");
    }
  };

  const handleConfirmOrder = () => {
    clearCart();
    navigate("/success");
  };

  if (!order) return <p>Loading order details...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.productId} className="flex items-center justify-between border-b pb-4">
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
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <p>{order.shippingAddress.fullName}</p>
          <p>{order.shippingAddress.address}</p>
          <p>{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
        </div>
      </div>

      <div className="mt-8 space-x-4">
        <button
          onClick={handleConfirmOrder}
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
        >
          Confirm Order
        </button>
        <button
          onClick={handleUpdateOrder}
          className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700"
        >
          Modify Order
        </button>
        <button
          onClick={handleCancelOrder}
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
        >
          Cancel Order
        </button>
      </div>
    </div>
  );
}

export default OrderConfirm;
