import { useState, useContext } from 'react'; // Make sure to import useContext
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Make sure CartContext is imported correctly
import bag from '../assets/bag-2.png';
import search from '../assets/search-normal.png';
import user from '../assets/user.png';
import logo2 from '../assets/logo2.png';
import Cart from "../pages/Cart"; 
import { SearchBar } from './SearchBar';

function Navbar({ onClick }) {
  const [showSearch, setShowSearch] = useState(false); 
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Use useContext to get cartQuantity from CartContext
  const { cartQuantity } = useContext(CartContext);

  return (
    <div className='bg-orange-200 p-4 relative'>
  
      <Link 
        to="/" 
        className="absolute left-1/2 transform -translate-x-1/2 text-3xl sm:text-5xl font-bold hover:text-orange-600"
      >
        <div className="flex items-center gap-2">
          <img src={logo2} alt="FloralBouquet logo" className="w-auto h-12 sm:h-16" />
          <h1>FloralBouquet</h1>
          <img src={logo2} alt="FloralBouquet logo2" className="w-auto h-12 sm:h-16" />
        </div>
      </Link>

      <div className='absolute right-4 sm:right-10 flex gap-3 sm:gap-6'>
        <div>
          <img 
            src={search} 
            alt='search' 
            onClick={() => setShowSearch(!showSearch)} 
            className='cursor-pointer w-6 sm:w-8' 
          />
        </div>

        {/* User icon now links to /signup */}
        <Link to="/login">
          <img 
            src={user} 
            alt='user' 
            className='cursor-pointer w-6 sm:w-8' 
          />
        </Link>

        {/* Cart icon with badge */}
        <div className="relative">
          <img 
            src={bag} 
            alt='cart' 
            onClick={() => setIsCartOpen(!isCartOpen)} 
            className='cursor-pointer w-6 sm:w-8' 
          />

          {/* Only show the badge if there are items in the cart */}
          {cartQuantity > 0 && (
            <div className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartQuantity}
            </div>
          )}
        </div>
        
      </div>

      {showSearch && (  
        <div className="absolute right-4 sm:right-10 top-16 shadow-md rounded-lg p-2 w-72 sm:w-96 z-50">
          <SearchBar />  
        </div>
      )}

      {/* Cart Sidebar Component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <ul className='flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 list-none p-2 text-lg mt-12 sm:mt-16'>
        <li><Link to="/AllBouquet" className="hover:text-orange-600">Bouquet</Link></li>
        <li><Link to="/Valentine-bouquet" className="hover:text-orange-600">Valentine's Day</Link></li>
        <li><Link to="/Wedding-bouquet" className="hover:text-orange-600">Wedding</Link></li>
        <li><Link to="/Gift-bouquet" className="hover:text-orange-600">Gift</Link></li>
      </ul>
    </div>
  );
}

export default Navbar;
