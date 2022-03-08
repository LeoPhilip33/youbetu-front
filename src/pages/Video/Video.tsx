
import './Video.scss';
import { uploadUrl } from '../../config';
import { BrowserRouter as Router, Route, Link, Routes, useSearchParams, useParams } from "react-router-dom"
import React from "react";
import axios from 'axios'
import url from '../../config';
import ReactPlayer from 'react-player'
import like from '../../img/icons/like.png';
import dislike from '../../img/icons/dislike.png';

function Video() {
    const [video, setVideo] = React.useState({
        title: '',
        description: '',
        video: '',
        miniature: '',
        likes: '',
        views: '',
        created_at: '',
    })
    let { id } = useParams();

    React.useEffect(() => {
        axios.get(`${url}/video/${id}`)
            .then((res) => {
                console.log(res.data)
                let data = res.data
                setVideo({
                    title: data.title,
                    description: data.description,
                    video: data.video,
                    miniature: data.miniature,
                    likes: data.likes,
                    views: data.views,
                    created_at: data.created_at,
                });
            })
    }, []);
    return (
        <section>
            <div className='video-container'>
                <ReactPlayer controls={true} url={uploadUrl + '/videos/' + video.video} />
                <h1>{video.title}</h1>
                <div className='view-container'>
                    <p>{video.views} vues</p>
                    <p>{video.likes}</p>
                    <p>{video.created_at.substring(0, 10)}</p>
                </div>
            </div>

        </section>
    );
}

export default Video;
