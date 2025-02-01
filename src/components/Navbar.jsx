import bag from '../assets/bag-2.png';
import search from '../assets/search-normal.png';
import user from '../assets/user.png';

function Navbar({ onClick }) {
  return (
    <div className='bg-orange-200 p-4'> 
      <div className='flex flex-col items-center'> 
        <div className='flex justify-between items-center w-full px-10'>
          <h1 className='flex-grow text-center text-5xl font-bold'>FloralBouquet</h1>
          <div className='flex gap-5'>
            <img src={search} alt='search' onClick={onClick} className='cursor-pointer w-8' />
            <img src={user} alt='user' onClick={onClick} className='cursor-pointer w-8' />
            <img src={bag} alt='bag' onClick={onClick} className='cursor-pointer w-8' />
          </div>
        </div>
        <ul className='flex justify-center gap-5 list-none p-2 text-lg'>
          <li className='cursor-pointer hover:text-orange-600'>Bouquet</li>
          <li className='cursor-pointer hover:text-orange-600'>Valentine's Day</li>
          <li className='cursor-pointer hover:text-orange-600'>Gift</li>
          <li className='cursor-pointer hover:text-orange-600'>Wedding</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
