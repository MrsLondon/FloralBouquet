import {  Routes, Route } from "react-router-dom";
import Homepage from './pages/HomePage';
import Navbar from './components/Navbar';
import ValentinePage from './pages/ValentinePage';
import WeddingPage from './pages/WeddingPage';
import GiftPage from './pages/GiftPage';
import ErrorPage from './pages/ErrorPage';
import ProductDetailsPage from "./pages/ProductDetailsPage";
import DaisyPage from './pages/DaisyPage';
import SunflowerPage from './pages/SunflowerPage';
import RosesPage from './pages/RosesPage';
import TulipsPage from './pages/TulipsPage';
import LiliesPage from './pages/LiliesPage';
import PeonyPage from './pages/PeonyPage';
import LavenderPage from './pages/LavenderPage';
import './App.css';

function App() {
  return (
    <div> 
    <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
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
      </Routes>
    </div>
      
    
  );
}

export default App;
