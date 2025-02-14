import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.context"; // Ensure this is imported correctly
import { FlowerProvider } from "./context/FlowerContext";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext.jsx";
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <SearchProvider>
    <BrowserRouter>
      <AuthProvider> 
        <CartProvider>
          <FlowerProvider>
            <App />
          </FlowerProvider>
        </CartProvider>
      </AuthProvider>  
    </BrowserRouter>
    </SearchProvider>
  </StrictMode>
);
