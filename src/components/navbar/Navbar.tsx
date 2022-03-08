import logo from '../../img/youbetu.png';
import upload from '../../img/upload.png'
import search from '../../img/search.png'
import user from '../../img/profile.png'
import menuBurger from '../../img/menu-burger.png'
import './Navbar.scss';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom"

function Navbar() {
  return (
      <div className='navbar'>
            <div className='menu-logo'>
                <Link to="/">
                    <img src={logo} className="logo" alt="logo Youbetu" />
                </Link>
            </div>
            <div className='d-flex search-bar'>
                <input type="text" placeholder="Rechercher" className="input-search-bar"/>
                <img src={search} className="search" alt="Logo youbetu" />
            </div>
            <div className='d-flex'>
                <div>
                    <img src={upload} className="upload" alt="Upload vidéo" />
                </div>
                <div>
                    <img src={user} className="user" alt="user" />
                </div>
            </div>
      </div>
  );
}

export default Navbar;