
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
    const [user, setUser] = React.useState({
        created_at: "",
        email: "",
        id: null,
        name: "",
        photo: "",
        subscriber: null,
        updated_at: "",
    })

    const [videos, setVideos] = React.useState([])

    let { id } = useParams();

    React.useEffect(() => {
        axios.get(`${url}/user/${id}`)
            .then((res) => {
                setUser(res.data);
            })

        axios.get(`${url}/video-user/${id}`)
            .then((res) => {
                setVideos(res.data);
            })

    }, []);
    return (
        <div className='home-page'>

            <LateralNavbar />

            <section className='profile-container'>
                <h1>{user.name}</h1>
                <h2>{user.subscriber} abonnés</h2>
                <section className='video-container'>
                    {videos.map((video, index) => {
                        return <VideoMiniature key={index} {...video} />
                    })}
                </section>
            </section>
        </div>
    );
}

export default Profile;
