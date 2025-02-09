import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  cartItems: [],
  cartSum: 0,
  cartQuantity: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartSum, setCartSum] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);

  const clearCart = () => {
    setCartItems([]);
  };
  
  const updateSumAndQuantity = (currentCart) => {
    const updatedCartQuantity = currentCart.reduce((count, curItem) => {
      return count + curItem.quantity;
    }, 0);
  
    const updatedCartSum = currentCart.reduce((sum, curItem) => {
      return sum + curItem.price * curItem.quantity; 
    }, 0);
  
    console.log("Updated Cart Sum:", updatedCartSum); 
    setCartSum(updatedCartSum);
    setCartQuantity(updatedCartQuantity);
  };
  
  useEffect(() => {
    updateSumAndQuantity(cartItems);
  }, [cartItems]);

  const addToCart = (flower, quantity = 1) => {
    setCartItems((prevCart) => {
      const updatedCart = [...prevCart];
      const existingItemIndex = updatedCart.findIndex((item) => item.id === flower.id);

      if (existingItemIndex >= 0) {
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity,
        };
      } else {
        updatedCart.push({ ...flower, quantity });
      }

      return updatedCart;
    });
  };

  const removeFromCart = (flowerId) => {
    setCartItems((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.id === flowerId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);

      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      cartSum, 
      cartQuantity, 
      addToCart, 
      removeFromCart, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};
