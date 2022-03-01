import logo from '../img/youbetu.png';
import './Navbar.css';

function Navbar() {
  return (
      <div className='navbar'>
          <div> <img src={logo} className="logo" alt="oui" /> </div>
          <div> searchbar </div>
          <div> importer vidéo </div>
          <div> logo profile </div>
      </div>
  );
}

export default Navbar;
