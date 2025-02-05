import bag from '../assets/bag-2.png';
import search from '../assets/search-normal.png';
import user from '../assets/user.png';
import { Link } from 'react-router-dom';

function Navbar({ onClick }) {
  return (
    <div className='bg-orange-200 p-4 relative'>
      {/* Logo - Centered */}
      <Link 
        to="/" 
        className="absolute left-1/2 transform -translate-x-1/2 text-3xl sm:text-5xl font-bold hover:text-orange-600"
      >
        <h1>FloralBouquet</h1>
      </Link>

      {/* Icons - Positioned to the right */}
      <div className='absolute right-4 sm:right-10 flex gap-3 sm:gap-6'>
        <img src={search} alt='search' onClick={onClick} className='cursor-pointer w-6 sm:w-8' />
        <img src={user} alt='user' onClick={onClick} className='cursor-pointer w-6 sm:w-8' />
        <img src={bag} alt='bag' onClick={onClick} className='cursor-pointer w-6 sm:w-8' />
      </div>

      {/* Navigation Links */}
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
