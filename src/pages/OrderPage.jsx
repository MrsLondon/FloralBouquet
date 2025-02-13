import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";
import { AuthContext } from "../context/auth.context"; 

function MyOrders() {
  const { clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]); 
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://flowerstore-api-json-server.onrender.com/orders");
        if (!response.ok) throw new Error("Failed to fetch orders");

        const ordersData = await response.json();

        
        if (user && user.email) {
          const userOrders = ordersData.filter((order) => order.email === user.email);
          setFilteredOrders(userOrders); 
        } else {
          setFilteredOrders([]); 
        }

        setOrders(ordersData); 
      } catch (error) {
        console.error("Error fetching orders:", error);
        alert("Failed to fetch orders. Please try again.");
      }
    };

    fetchOrders();
  }, [user]); 

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleModifyOrder = (order) => {
    setIsEditing(true);
    setEditedOrder(order);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `https://flowerstore-api-json-server.onrender.com/orders/${editedOrder.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedOrder),
        }
      );

      if (!response.ok) throw new Error("Failed to update the order");

      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
      setFilteredOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
      setIsEditing(false);
      alert("Order updated successfully!");
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update the order. Please try again.");
    }
  };

  const handleCancelOrderClick = (orderId) => {
    setOrderToCancel(orderId);
    setIsModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!orderToCancel) return;

    try {
      const response = await fetch(
        `https://flowerstore-api-json-server.onrender.com/orders/${orderToCancel}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to cancel the order");

      
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderToCancel));
      setFilteredOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderToCancel));

      
      setIsModalOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("Failed to cancel the order. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setOrderToCancel(null);
  };

  const handleInputChange = (e, field) => {
    setEditedOrder({
      ...editedOrder,
      [field]: e.target.value,
    });
  };

  if (orders.length === 0) return <p>Loading orders...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                <p className="text-gray-600">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                <p className="text-gray-600">Total: €{parseFloat(order.totalPrice).toFixed(2)}</p>
              </div>
              <button
                onClick={() => toggleOrderDetails(order.id)}
                className="text-blue-600 hover:text-blue-800"
              >
                {expandedOrderId === order.id ? "Hide Details" : "View Details"}
              </button>
            </div>

            {expandedOrderId === order.id && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Items</h3>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex justify-between border-b pb-2">
                      <div>
                        <h4 className="text-md font-semibold">{item.name}</h4>
                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-black-600 font-semibold">€{(item.quantity * parseFloat(item.price)).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-semibold mt-4 mb-2">Shipping Information</h3>
                {isEditing && editedOrder?.id === order.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editedOrder.shippingAddress.fullName}
                      onChange={(e) =>
                        setEditedOrder({
                          ...editedOrder,
                          shippingAddress: {
                            ...editedOrder.shippingAddress,
                            fullName: e.target.value,
                          },
                        })
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    <input
                      type="text"
                      value={editedOrder.shippingAddress.address}
                      onChange={(e) =>
                        setEditedOrder({
                          ...editedOrder,
                          shippingAddress: {
                            ...editedOrder.shippingAddress,
                            address: e.target.value,
                          },
                        })
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    <input
                      type="text"
                      value={editedOrder.shippingAddress.city}
                      onChange={(e) =>
                        setEditedOrder({
                          ...editedOrder,
                          shippingAddress: {
                            ...editedOrder.shippingAddress,
                            city: e.target.value,
                          },
                        })
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    <input
                      type="text"
                      value={editedOrder.shippingAddress.zipCode}
                      onChange={(e) =>
                        setEditedOrder({
                          ...editedOrder,
                          shippingAddress: {
                            ...editedOrder.shippingAddress,
                            zipCode: e.target.value,
                          },
                        })
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    <button
                      onClick={handleSaveChanges}
                      className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                    >
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <div>
                    <p>{order.shippingAddress.fullName}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
                    
                    <div className="mt-4 space-x-2">
                      <button
                        onClick={() => handleModifyOrder(order)}
                        className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700"
                      >
                        Modify Order
                      </button>
                      <button
                        onClick={() => handleCancelOrderClick(order.id)}
                        className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                      >
                        Cancel Order
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmCancel}
        onCancel={handleCancel}
        message="Are you sure you want to cancel the order?"
      />
    </div>
  );
}

export default MyOrders;