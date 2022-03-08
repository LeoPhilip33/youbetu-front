
import './Home.scss';
import VideoMiniature from '../../components/Video/VideoMiniature';
import React from "react";
import axios from 'axios'
import url from '../../config';

function Home() {
    const [videos, setVideos] = React.useState([])

    React.useEffect(() => {
        axios.get(`${url}/videos`)
            .then((res) => {
                console.log(res.data)
                setVideos(res.data);
            })
    }, []);
    return (
        <div className='home-page'>
            <h1>Home page</h1>

            <section className='video-container'>
                {videos.map((video, index) => {
                    return <VideoMiniature key={index} {...video} />
                })}
            </section>
        </div>
    );
}

export default Home;
