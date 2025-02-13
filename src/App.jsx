import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import ValentinePage from "./pages/ValentinePage";
import WeddingPage from "./pages/WeddingPage";
import GiftPage from "./pages/GiftPage";
import ErrorPage from "./pages/ErrorPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import DaisyPage from "./pages/DaisyPage";
import SunflowerPage from "./pages/SunflowerPage";
import RosesPage from "./pages/RosesPage";
import TulipsPage from "./pages/TulipsPage";
import LiliesPage from "./pages/LiliesPage";
import PeonyPage from "./pages/PeonyPage";
import LavenderPage from "./pages/LavenderPage";
import AllBouquet from "./pages/AllBouquet";
import Footer from "./components/Footer";
import { SearchBar } from "./components/SearchBar";
import { useState } from "react";
import { Success, Cancel } from "./pages/FeedbackPages";
import SignupPage from "./pages/SignupPage"; 
import LoginPage from "./pages/LoginPage"; 
import ProtectedRoutes from "./components/ProtectedRoutes";
import CheckoutPage from "./pages/Checkout";
import AccPage from "./pages/AccPage";
import OrderPage from "./pages/OrderPage";


import "./App.css";

function App() {
  const [showSearch, setShowSearch] = useState(false);
  const [results, setResults] = useState([]);

  return (
    <div>
      <Navbar onClick={() => setShowSearch(!showSearch)} />

      {/* Search Bar (only shown when 'showSearch' is true) */}
      {showSearch && (
        <div>
          <SearchBar />
        </div>
      )}
     <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/AllBouquet" element={<AllBouquet />} />
        <Route path="/Valentine-bouquet" element={<ValentinePage />} />
        <Route path="/Wedding-bouquet" element={<WeddingPage />} />
        <Route path="/Gift-bouquet" element={<GiftPage />} />
        <Route path="/flower/:flowerId" element={<ProductDetailsPage />} />
        <Route path="/daisy" element={<DaisyPage />} />
        <Route path="/sunflower" element={<SunflowerPage />} />
        <Route path="/roses" element={<RosesPage />} />
        <Route path="/tulips" element={<TulipsPage />} />
        <Route path="/lilies" element={<LiliesPage />} />
        <Route path="/peony" element={<PeonyPage />} />
        <Route path="/lavender" element={<LavenderPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/signup" element={<ProtectedRoutes><SignupPage /></ProtectedRoutes>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/account" element={<AccPage />} />
        <Route path="/myorder/:orderId" element={<OrderPage />} />

      </Routes>

      <Footer />
    </div>
  );
}

export default App;