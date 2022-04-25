
import './Dashboard.scss';
import VideoMiniature from '../../components/Video/VideoMiniature';
import React from "react";
import axios from 'axios'
import url from '../../config';
import LateralNavbar from '../../components/LateralNavbar/LateralNavbar';
import { useSelector } from 'react-redux';
import VideoMiniatureDasboard from '../../components/Video/VideoMiniatureDashboard';
import { authenticatedFetch } from '../../utils';

function Home() {
    const [videos, setVideos] = React.useState([])

    React.useEffect(() => {
        axios.get(`${url}/video-user/${localStorage.userId}`)
            .then((res) => {
                setVideos(res.data);
            })
    }, []);

    const reload = () => {
        axios.get(`${url}/video-user/${localStorage.userId}`)
            .then((res) => {
                setVideos(res.data);
            })
    }
    return (
        <div className='home-page'>

            <LateralNavbar />

            <h1 className="videos">Mes videos</h1>
            <section className='video-container'>
                {videos.map((video, index) => {

                    return <VideoMiniatureDasboard reload={reload} key={index} {...video} ></VideoMiniatureDasboard>
                })}
            </section>
        </div>
    );
}

export default Home;
