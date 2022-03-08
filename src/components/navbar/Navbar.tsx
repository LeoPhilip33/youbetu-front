import logo from '../../img/youbetu.png';
import './Navbar.scss';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom"

function Navbar() {
    return (
        <div className='navbar'>
            <div> <img src={logo} className="logo" alt="oui" /> </div>
            <div> searchbar </div>
            <div> importer vidéo </div>
            <Link to="/register"> logo profile </Link>
            <Link to="/upload-video"> upload-video </Link>
        </div>
    );
}

export default Navbar;
