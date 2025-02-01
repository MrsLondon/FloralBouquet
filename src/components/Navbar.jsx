import bag from '../assets/bag-2.png';
import search from '../assets/search-normal.png';
import user from '../assets/user.png';
import { Link } from 'react-router-dom';

function Navbar({ onClick }) {
  return (
    <div className='bg-orange-200 p-4'> 
      <div className='flex flex-col items-center'> 
        <div className='relative flex items-center w-full px-10'>
          <h1 className='mx-auto text-5xl font-bold'>FloralBouquet</h1>
          <div className='absolute right-10 flex gap-6'>
            <img src={search} alt='search' onClick={onClick} className='cursor-pointer w-8' />
            <img src={user} alt='user' onClick={onClick} className='cursor-pointer w-8' />
            <img src={bag} alt='bag' onClick={onClick} className='cursor-pointer w-8' />
          </div>
        </div>
        <ul className='flex justify-center gap-5 list-none p-2 text-lg'>
          
          <li>
             <Link to="/" className="hover:text-orange-600">Bouquet</Link>
          </li>
          <li>
            <Link to="/Valentine-bouquet" className="hover:text-orange-600">Valentine's Day</Link>
          </li>
          <li>
          <Link to="/Wedding-bouquet" className="hover:text-orange-600">Wedding</Link>
          </li>
          <li>
          <Link to="/Gift-bouquet" className="hover:text-orange-600">Gift</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;


