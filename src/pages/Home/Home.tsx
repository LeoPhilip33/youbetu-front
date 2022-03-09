
import './Home.scss';
import VideoMiniature from '../../components/Video/VideoMiniature';
import React from "react";
import axios from 'axios'
import url from '../../config';
import LateralNavbar from '../../components/LateralNavbar/LateralNavbar';
import { useSelector } from 'react-redux';

function Home() {
    const [videos, setVideos] = React.useState([])

    React.useEffect(() => {
        axios.get(`${url}/videos`)
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

export default Home;
