import bag from '../assets/bag-2.png';
import search from '../assets/search-normal.png';
import user from '../assets/user.png';

function Navbar({ onClick }) {
  return (
    <div>
        <h1>FloralBouquet</h1>
        <nav>
            <ul>
                <li>Bouquet</li>
                <li>Valentines's Day</li>
                <li>Gift</li>
                <li>Wedding</li>
            </ul>
        </nav>
        <div>
            <img src={search} alt="search" onClick={ onClick } style={{  cursor: "pointer" }} />
            <img src={user} alt="user" onClick={ onClick } style={{  cursor: "pointer" }}  />
            <img src={bag} alt="bag" onClick={ onClick } style={{  cursor: "pointer" }} />
    </div>
       </div>
     
  );
}
export default Navbar;