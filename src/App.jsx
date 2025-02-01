import { Routes, Route } from "react-router-dom";
import Homepage from './pages/HomePage';
import Navbar from './components/Navbar';
import ValentinePage from './pages/ValentinePage';
import WeddingPage from './pages/WeddingPage';
import GiftPage from './pages/GiftPage';
import ErrorPage from './pages/ErrorPage';
import './App.css';

function App() {
  
  return (
    <>
    <div>
    <Navbar/>
  <Routes>
    <Route path="/" element={<Homepage/>} />
    <Route path="/Valentine-bouquet" element={<ValentinePage/>} />
    <Route path="/Wedding-bouquet" element={<WeddingPage/>} />
    <Route path="/Gift-bouquet" element={<GiftPage/>} />
    <Route path="*" element={<ErrorPage/>} />
   </Routes>

    </div>
    </>
    
  );
  
}

export default App;
