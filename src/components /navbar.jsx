import bag from '../assets/bag-2.png';
import search from '../assets/search-normal.png';
import user from '../assets/user.png';
import '../style/navbar.css';

function Navbar({ onClick }) {
  return (
    <div className='navbar'> 
      <div className='header'> 
        <div className='title'>
          <h1>FloralBouquet</h1>
          <div className='icons'>
            <img src={search} alt="search" onClick={ onClick } style={{ cursor: "pointer" }} />
            <img src={user} alt="user" onClick={ onClick } style={{ cursor: "pointer" }} />
            <img src={bag} alt="bag" onClick={ onClick } style={{ cursor: "pointer" }} />
          </div>
        </div>

        <ul className='choices'>
          <li>Bouquet</li>
          <li>Valentine's Day</li>
          <li>Gift</li>
          <li>Wedding</li>
        </ul>
      </div>
    </div>
  );
}
export default Navbar;
