import logo from '../../img/youbetu.png';
import upload from '../../img/upload.png'
import search from '../../img/search.png'
import user from '../../img/profile.png'
import './Navbar.scss';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom"
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import url, { uploadUrl } from '../../config';
import { authenticatedFetch } from '../../utils';
import UserInfo from './UserInfo';
import { UserContext } from '../../UserContext';

function Navbar() {

    const [photo, setPhoto] = useState('')
    let token = localStorage.userId

    const [isLogged, setIsLogged] = useContext(UserContext);


    useEffect(() => {
        authenticatedFetch('GET', `/user/${localStorage.userId}`)
            .then((res) => {
                setPhoto(res.data.photo);

            })
    }, [token]);
    return (
        <div className='navbar'>
            <div className='menu-logo'>
                <Link to="/">
                    <img src={logo} className="logo" alt="logo Youbetu" />
                </Link>
            </div>
            <div className='d-flex search-bar'>
                <input type="text" placeholder="Rechercher" className="input-search-bar" />
                <img src={search} className="search" alt="Logo youbetu" />
            </div>
            <div className='d-flex'>
                <div>
                    {localStorage.token !== null && localStorage.token !== undefined ?

                        <Link to="upload-video">
                            <img src={upload} className="upload" alt="Upload vidéo" />
                        </Link>
                        :
                        ''
                    }
                </div>
                <div>
                    {localStorage.token !== null && localStorage.token !== undefined ?

                        <button>
                            <Link to="dashboard">
                                <img src={uploadUrl + '/photos/' + photo} className="user" alt="user" /></Link>
                        </button>
                        :
                        <Link className='login-btn' to="login">
                            <button className='btn-connexion'> SE CONNECTER </button>
                        </Link>
                    }
                </div>
            </div>

        </div>
    );
}

export default Navbar;
