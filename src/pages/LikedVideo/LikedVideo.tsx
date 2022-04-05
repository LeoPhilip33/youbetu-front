
import './LikedVideo.scss';
import VideoMiniature from '../../components/Video/VideoMiniature';
import React from "react";
import axios from 'axios'
import url from '../../config';
import LateralNavbar from '../../components/LateralNavbar/LateralNavbar';
import { useSelector } from 'react-redux';

function LikedVideo() {
    const [videos, setVideos] = React.useState([])

    React.useEffect(() => {
        axios.get(`${url}/liked-videos/${localStorage.userId}`)
            .then((res) => {
                setVideos(res.data);
            })
    }, []);
    return (
        <div className='home-page'>

            <LateralNavbar />

            <section className='video-container'>
                {videos.map((video, index) => {
                    return <VideoMiniature key={index} {...video} />
                })}
            </section>
        </div>
    );
}

export default LikedVideo;
