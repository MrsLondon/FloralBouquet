import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { FlowerProvider } from "./context/FlowerContext";
import { CartProvider } from "./context/CartContext";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <CartProvider>
  <FlowerProvider>
    <App />
  </FlowerProvider>
  </CartProvider>
  </BrowserRouter>
  </StrictMode>
);
