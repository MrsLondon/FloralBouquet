import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (flower, quantity) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === flower.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === flower.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevCart, { ...flower, quantity }];
      }
    });
  };

  const removeFromCart = (flowerId) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== flowerId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
