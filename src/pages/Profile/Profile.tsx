
import './Profile.scss';
import VideoMiniature from '../../components/Video/VideoMiniature';
import React from "react";
import axios from 'axios'
import url from '../../config';
import LateralNavbar from '../../components/LateralNavbar/LateralNavbar';
import { useSelector } from 'react-redux';
import Sub from '../../components/Sub/Sub';
import { useParams } from 'react-router-dom';

function Profile() {
    const [users, setUsers] = React.useState([])

    let { id } = useParams();

    React.useEffect(() => {
        axios.get(`${url}/users/${localStorage.userId}`)
            .then((res) => {
                setUsers(res.data);
            })
    }, []);
    return (
        <div className='home-page'>

            <LateralNavbar />

            <section className='profile-container'>
                <h1>Profile</h1>
            </section>
        </div>
    );
}

export default Profile;
